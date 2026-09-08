"use client";

import React, { useState } from 'react';
import { soundEngine } from '@/core';
import {
  PRESET_ROLES,
  RBAC_MODULES,
  PermissionAction,
  RolePreset
} from '@/data/rbacMatrixData';

export const RoleMatrixTab: React.FC = () => {
  const [selectedRoleId, setSelectedRoleId] = useState<string>('cashier');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Local state for permissions so user can dynamically toggle and experiment!
  const [customPermissions, setCustomPermissions] = useState<Record<string, Record<string, PermissionAction[]>>>(() => {
    const initial: Record<string, Record<string, PermissionAction[]>> = {};
    PRESET_ROLES.forEach(role => {
      initial[role.id] = { ...role.permissions };
    });
    return initial;
  });

  const activeRole: RolePreset = PRESET_ROLES.find(r => r.id === selectedRoleId) || PRESET_ROLES[0];
  const rolePerms = customPermissions[activeRole.id] || {};

  const handleSelectRole = (roleId: string) => {
    soundEngine.playPulseNode();
    setSelectedRoleId(roleId);
  };

  const handleTogglePermission = (moduleId: string, action: PermissionAction) => {
    soundEngine.playPulseNode();
    setCustomPermissions(prev => {
      const currentRolePerms = prev[activeRole.id] || {};
      const currentModuleActions = currentRolePerms[moduleId] || [];
      const hasAction = currentModuleActions.includes(action);

      let newActions: PermissionAction[];
      if (hasAction) {
        newActions = currentModuleActions.filter(a => a !== action);
      } else {
        newActions = [...currentModuleActions, action];
      }

      return {
        ...prev,
        [activeRole.id]: {
          ...currentRolePerms,
          [moduleId]: newActions
        }
      };
    });
  };

  const handleSelectAllForModule = (moduleId: string, supportedActions: PermissionAction[]) => {
    soundEngine.playSystemAccess();
    setCustomPermissions(prev => {
      const currentRolePerms = prev[activeRole.id] || {};
      const currentModuleActions = currentRolePerms[moduleId] || [];
      const isAllSelected = supportedActions.every(a => currentModuleActions.includes(a));

      return {
        ...prev,
        [activeRole.id]: {
          ...currentRolePerms,
          [moduleId]: isAllSelected ? [] : [...supportedActions]
        }
      };
    });
  };

  const categories = [
    { id: 'all', label: 'ყველა მოდული (40+)' },
    { id: 'pos_sales', label: '🛒 სალარო & გაყიდვები' },
    { id: 'customers', label: '👥 კლიენტები' },
    { id: 'staff', label: '🏋️ პერსონალი' },
    { id: 'infrastructure', label: '🏢 ტურნიკეტები / IoT' },
    { id: 'analytics', label: '📊 ფინანსები & KPI' },
    { id: 'marketing', label: '📈 მარკეტინგი' },
    { id: 'security', label: '🛡️ უსაფრთხოება' }
  ];

  const filteredModules = RBAC_MODULES.filter(mod => {
    const matchesCategory = activeCategory === 'all' || mod.category === activeCategory;
    const matchesSearch =
      mod.nameKa.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mod.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mod.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getActionColor = (action: PermissionAction) => {
    switch (action) {
      case 'CREATE': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'READ': return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30';
      case 'UPDATE': return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      case 'DELETE': return 'bg-rose-500/20 text-rose-300 border-rose-500/30';
      case 'MANAGE': return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'MANAGE_DEVICES': return 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  return (
    <div className="space-y-4 text-xs font-sans">
      {/* Role Preset Selector Bar */}
      <div className="p-3 bg-[#0B0E14] border border-white/10 rounded-xl space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-white flex items-center gap-1.5">
              <span>🎭</span> როლის არჩევა / სიმულაცია:
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#00A3FF]/15 text-[#00A3FF] border border-[#00A3FF]/30">
              CASL Isomorphic Engine
            </span>
          </div>
          <span className="text-[11px] text-gray-400 font-mono hidden sm:inline-block">
            {activeRole.code}
          </span>
        </div>

        {/* Role Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-1.5">
          {PRESET_ROLES.map(role => {
            const isSelected = role.id === selectedRoleId;
            return (
              <button
                key={role.id}
                onClick={() => handleSelectRole(role.id)}
                className={`flex items-center gap-1.5 p-2 rounded-lg border text-left transition-all ${
                  isSelected
                    ? 'bg-[#00A3FF]/20 border-[#00A3FF] text-white shadow-[0_0_15px_rgba(0,163,255,0.3)] font-semibold'
                    : 'bg-[#121722] border-white/5 text-gray-400 hover:text-gray-200 hover:border-white/20'
                }`}
              >
                <span className="text-base">{role.icon}</span>
                <div className="truncate">
                  <div className="truncate text-[11px] font-medium leading-tight">{role.nameKa}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Role Description & Security Note */}
        <div className="p-2.5 bg-[#121722]/80 border border-white/5 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <p className="text-[11px] text-gray-300 leading-relaxed">
            {activeRole.descriptionKa}
          </p>
          {activeRole.blockedActionsNoteKa && (
            <span className="shrink-0 text-[10px] font-mono font-medium px-2 py-1 rounded bg-rose-500/10 border border-rose-500/20 text-rose-300">
              {activeRole.blockedActionsNoteKa}
            </span>
          )}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2">
        {/* Category Pills */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => {
                soundEngine.playPulseNode();
                setActiveCategory(cat.id);
              }}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium whitespace-nowrap transition-all border ${
                activeCategory === cat.id
                  ? 'bg-white/10 text-white border-white/30 font-semibold'
                  : 'bg-transparent text-gray-400 border-transparent hover:text-gray-200 hover:bg-white/5'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative min-w-[180px]">
          <input
            type="text"
            placeholder="🔍 მოდულის ძიება..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-[#0B0E14] border border-white/10 rounded-lg px-2.5 py-1 text-[11px] text-white placeholder-gray-500 focus:outline-none focus:border-[#00A3FF]"
          />
        </div>
      </div>

      {/* Permissions Matrix Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 max-h-[380px] overflow-y-auto pr-1">
        {filteredModules.map(module => {
          const activeActions = rolePerms[module.id] || [];
          const isAllSelected = module.supportedActions.every(a => activeActions.includes(a));

          return (
            <div
              key={module.id}
              className={`p-3 rounded-xl border transition-all ${
                activeActions.length > 0
                  ? 'bg-[#0E131E] border-white/15 shadow-sm'
                  : 'bg-[#0B0E14]/70 border-white/5 opacity-70'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] font-bold text-[#00A3FF] bg-[#00A3FF]/10 px-1.5 py-0.5 rounded border border-[#00A3FF]/20">
                    {module.id}
                  </span>
                  <span className="text-[12px] font-medium text-white">
                    {module.nameKa}
                  </span>
                </div>
                <button
                  onClick={() => handleSelectAllForModule(module.id, module.supportedActions)}
                  className="text-[10px] text-gray-400 hover:text-[#00A3FF] transition-colors font-mono"
                >
                  {isAllSelected ? '⚡ გაუქმება' : '⚡ მონიშნე ყველა'}
                </button>
              </div>

              {/* Action Checkbox Badges */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {module.supportedActions.map(action => {
                  const isChecked = activeActions.includes(action);
                  const isDeleteOnCashier = activeRole.id === 'cashier' && action === 'DELETE';

                  return (
                    <button
                      key={action}
                      disabled={isDeleteOnCashier}
                      onClick={() => handleTogglePermission(module.id, action)}
                      className={`flex items-center gap-1 px-2 py-1 rounded border text-[10px] font-mono transition-all ${
                        isDeleteOnCashier
                          ? 'bg-rose-950/40 border-rose-700/30 text-rose-400 opacity-60 cursor-not-allowed'
                          : isChecked
                          ? `${getActionColor(action)} font-bold shadow-sm`
                          : 'bg-black/30 border-white/5 text-gray-500 hover:text-gray-300 hover:border-white/20'
                      }`}
                      title={isDeleteOnCashier ? 'დაბლოკილია შიდა თაღლითობის პრევენციისთვის' : undefined}
                    >
                      <span>{isChecked ? '✓' : isDeleteOnCashier ? '⛔' : '○'}</span>
                      <span>{action}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
