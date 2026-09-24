#!/usr/bin/env node
/**
 * Artron Backend Knowledge MCP Server
 * Zero-dependency Model Context Protocol server exposing all 117 NestJS backend services,
 * 85 modules, methods, inputs, outputs, and business logic from backend_services_analysis.md.
 */

import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ANALYSIS_PATH = path.resolve(
  __dirname,
  '../public/back end service analis/backend_services_analysis.md'
);

// In-memory indexed database
let modules = [];
let services = [];
let servicesMap = new Map();
let modulesMap = new Map();

function parseMarkdown() {
  if (!fs.existsSync(ANALYSIS_PATH)) {
    console.error(`Error: File not found at ${ANALYSIS_PATH}`);
    return;
  }

  const content = fs.readFileSync(ANALYSIS_PATH, 'utf-8');
  const lines = content.split('\n');

  let currentModule = null;
  let currentService = null;
  let inTable = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Module Match: ## 📦 მოდული: NAME
    if (line.startsWith('## 📦 მოდული:')) {
      const moduleName = line.replace('## 📦 მოდული:', '').trim();
      currentModule = {
        name: moduleName,
        services: []
      };
      modules.push(currentModule);
      modulesMap.set(moduleName.toLowerCase(), currentModule);
      currentService = null;
      inTable = false;
      continue;
    }

    // Service Match: ### 🔹 `ServiceName`
    if (line.startsWith('### 🔹')) {
      const match = line.match(/`([^`]+)`/);
      const serviceName = match ? match[1] : line.replace('### 🔹', '').trim();
      currentService = {
        name: serviceName,
        module: currentModule ? currentModule.name : 'UNKNOWN',
        filePath: '',
        functionCount: 0,
        methods: [],
        rawSummary: ''
      };
      services.push(currentService);
      servicesMap.set(serviceName.toLowerCase(), currentService);
      if (currentModule) {
        currentModule.services.push(serviceName);
      }
      inTable = false;
      continue;
    }

    if (!currentService) continue;

    // File path match
    if (line.startsWith('- **ფაილის გზა:**')) {
      const pathMatch = line.match(/`([^`]+)`/);
      if (pathMatch) {
        currentService.filePath = pathMatch[1];
      }
      continue;
    }

    // Function count match
    if (line.startsWith('- **ფუნქციების რაოდენობა:**')) {
      const countMatch = line.match(/(\d+)/);
      if (countMatch) {
        currentService.functionCount = parseInt(countMatch[1], 10);
      }
      continue;
    }

    // Table Header
    if (line.includes('| ფუნქციის დასახელება |')) {
      inTable = true;
      continue;
    }

    // Table row parse: | `funcName()` | type | `input` | `return` | description |
    if (inTable && line.startsWith('|') && !line.includes('---')) {
      const parts = line.split('|').map((p) => p.trim());
      if (parts.length >= 6) {
        const nameClean = parts[1].replace(/[`()]/g, '').trim();
        if (nameClean && nameClean !== 'ფუნქციის დასახელება') {
          currentService.methods.push({
            name: nameClean,
            type: parts[2] || '',
            input: parts[3] ? parts[3].replace(/`/g, '') : '',
            returnType: parts[4] ? parts[4].replace(/`/g, '') : '',
            description: parts[5] || ''
          });
        }
      }
      continue;
    }

    if (line.startsWith('---')) {
      inTable = false;
    }
  }
}

// Search utility
function searchServices(query) {
  const q = query.toLowerCase().trim();
  const results = [];

  for (const s of services) {
    let score = 0;
    const nameMatch = s.name.toLowerCase().includes(q);
    const moduleMatch = s.module.toLowerCase().includes(q);
    const matchingMethods = s.methods.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q) ||
        m.input.toLowerCase().includes(q)
    );

    if (nameMatch) score += 10;
    if (moduleMatch) score += 5;
    if (matchingMethods.length > 0) score += matchingMethods.length * 2;

    if (score > 0) {
      results.push({
        service: s.name,
        module: s.module,
        filePath: s.filePath,
        totalFunctions: s.functionCount,
        matchedMethods: matchingMethods.slice(0, 5).map((m) => `${m.name}(${m.input}) -> ${m.returnType}: ${m.description}`)
      });
    }
  }

  return results.slice(0, 15);
}

function getServiceDetails(serviceName) {
  const s = servicesMap.get(serviceName.toLowerCase().trim());
  if (!s) {
    return { error: `Service '${serviceName}' not found in backend analysis.` };
  }
  return {
    service: s.name,
    module: s.module,
    filePath: s.filePath,
    functionCount: s.functionCount,
    methods: s.methods
  };
}

function listModules() {
  return modules.map((m) => ({
    module: m.name,
    serviceCount: m.services.length,
    services: m.services
  }));
}

function getModuleServices(moduleName) {
  const m = modulesMap.get(moduleName.toLowerCase().trim());
  if (!m) {
    return { error: `Module '${moduleName}' not found.` };
  }
  return {
    module: m.name,
    serviceCount: m.services.length,
    services: m.services.map((name) => {
      const s = servicesMap.get(name.toLowerCase());
      return {
        name,
        functionCount: s ? s.functionCount : 0,
        filePath: s ? s.filePath : '',
        methodsSample: s ? s.methods.slice(0, 3).map((met) => met.name) : []
      };
    })
  };
}

// Tool Definitions for MCP
const TOOLS = [
  {
    name: 'search_backend_services',
    description: 'Search across 117 NestJS backend services and 85 modules by keyword, method name, or business feature (e.g., "turniket", "churn", "cashback", "sms", "auth", "rs").',
    inputSchema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'The search query (keyword, service name, or function name)'
        }
      },
      required: ['query']
    }
  },
  {
    name: 'get_service_details',
    description: 'Get full parameters, return types, method signatures, file path, and descriptions for any NestJS service (e.g., "TurniketService", "ChurnPredictionService", "AbonimentService", "CashbackService").',
    inputSchema: {
      type: 'object',
      properties: {
        serviceName: {
          type: 'string',
          description: 'The exact or partial name of the service'
        }
      },
      required: ['serviceName']
    }
  },
  {
    name: 'list_backend_modules',
    description: 'List all 85 backend modules with their registered service names and counts.',
    inputSchema: {
      type: 'object',
      properties: {}
    }
  },
  {
    name: 'get_module_services',
    description: 'Get all services and their methods belonging to a specific backend module (e.g., "CHURN-PREDICTION", "TURNIKET", "CASHBACK", "AUTHENTICATION").',
    inputSchema: {
      type: 'object',
      properties: {
        moduleName: {
          type: 'string',
          description: 'The name of the module'
        }
      },
      required: ['moduleName']
    }
  }
];

// CLI / Standalone Test Mode
if (process.argv.includes('--test')) {
  parseMarkdown();
  console.log(`[MCP TEST] Successfully parsed: ${modules.length} modules, ${services.length} services.`);
  
  const searchTest = searchServices('turniket');
  console.log('[MCP TEST] Search "turniket":', searchTest.length, 'results found.');
  
  const serviceTest = getServiceDetails('TurniketService');
  console.log('[MCP TEST] Service "TurniketService":', serviceTest.service, `${serviceTest.methods?.length || 0} methods.`);
  
  process.exit(0);
}

// MCP Stdio Server Loop
parseMarkdown();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

function sendResponse(id, result) {
  const res = {
    jsonrpc: '2.0',
    id,
    result
  };
  process.stdout.write(JSON.stringify(res) + '\n');
}

function sendError(id, code, message) {
  const res = {
    jsonrpc: '2.0',
    id,
    error: { code, message }
  };
  process.stdout.write(JSON.stringify(res) + '\n');
}

rl.on('line', (line) => {
  if (!line.trim()) return;

  let request;
  try {
    request = JSON.parse(line);
  } catch (err) {
    return;
  }

  const { id, method, params } = request;

  if (method === 'initialize') {
    sendResponse(id, {
      protocolVersion: '2024-11-05',
      capabilities: {
        tools: {}
      },
      serverInfo: {
        name: 'artron-backend-knowledge',
        version: '1.0.0'
      }
    });
    return;
  }

  if (method === 'notifications/initialized') {
    return;
  }

  if (method === 'tools/list') {
    sendResponse(id, { tools: TOOLS });
    return;
  }

  if (method === 'tools/call') {
    const { name, arguments: args } = params || {};
    let output;

    switch (name) {
      case 'search_backend_services':
        output = searchServices(args?.query || '');
        break;
      case 'get_service_details':
        output = getServiceDetails(args?.serviceName || '');
        break;
      case 'list_backend_modules':
        output = listModules();
        break;
      case 'get_module_services':
        output = getModuleServices(args?.moduleName || '');
        break;
      default:
        sendError(id, -32601, `Unknown tool: ${name}`);
        return;
    }

    sendResponse(id, {
      content: [
        {
          type: 'text',
          text: JSON.stringify(output, null, 2)
        }
      ]
    });
    return;
  }

  if (id !== undefined) {
    sendError(id, -32601, `Method '${method}' not implemented`);
  }
});
