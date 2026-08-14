import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { TurnstileGateway } from './turnstile.gateway';
import { Socket } from 'socket.io';

@Controller('api/turnstile')
export class TurnstileController {
  constructor(private readonly turnstileGateway: TurnstileGateway) {}

  @Post('override')
  @HttpCode(HttpStatus.OK)
  async manualOverride(
    @Body() body: { tenantId: string; direction: 'IN' | 'OUT'; operatorId: string }
  ) {
    const result = this.turnstileGateway.triggerManualOverride(
      body.tenantId,
      body.direction,
      body.operatorId
    );
    return {
      success: true,
      message: 'Manual override trigger signal broadcasted successfully',
      data: result,
    };
  }

  @Post('mock-scan')
  @HttpCode(HttpStatus.OK)
  async mockScan(
    @Body() body: { qrToken: string; direction: 'IN' | 'OUT'; tenantId: string }
  ) {
    // Allows REST clients to simulate a QR scan triggering websocket verification
    const mockClient = { id: 'rest-mock-client' } as unknown as Socket;
    const result = await this.turnstileGateway.handleScanQR(body, mockClient);
    return result;
  }
}
