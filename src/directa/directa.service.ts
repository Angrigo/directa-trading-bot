import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Socket } from 'net';

@Injectable()
export class DirectaService implements OnModuleInit {

    private readonly logger = new Logger(DirectaService.name);
    private tradingSocket: Socket;
    private readonly maxReconnectAttempts = 5;
    private reconnectAttempts = 0;

    onModuleInit() {
        this.connectToTrading();
    }

    async connectToTrading() {
        if (this.tradingSocket && !this.tradingSocket.destroyed) {
            this.logger.warn('Already connected to TRADING channel');
            return;
        }

        return new Promise((resolve, reject) => {
            this.tradingSocket = new Socket();

            this.tradingSocket.connect(10002, '127.0.0.1', () => {
                this.logger.log('Connected to TRADING channel');
                this.reconnectAttempts = 0; // Reset reconnect attempts
                resolve(true);
            });

            this.tradingSocket.on('data', (data) => {
                this.logger.log('Received from TRADING: ' + data.toString());
            });

            this.tradingSocket.on('error', (error) => {
                this.logger.error('Error with TRADING socket:', error.message);
                this.tradingSocket.destroy();
                reject(error);
            });

            this.tradingSocket.on('close', () => {
                this.logger.log('TRADING socket closed');
                if (this.reconnectAttempts < this.maxReconnectAttempts) {
                    this.logger.log('Attempting to reconnect...');
                    this.reconnectAttempts++;
                    setTimeout(() => this.connectToTrading(), 5000); // Try to reconnect after 5 seconds
                } else {
                    this.logger.error('Max reconnection attempts reached');
                }
            });
        });
    }

    async sendTradingCommand(command: string) {
        if (this.tradingSocket && !this.tradingSocket.destroyed) {
            this.tradingSocket.write(command + '\n'); // Commands are terminated by the NEWLINE character
        } else {
            this.logger.error('TRADING socket is not connected or is destroyed');
            throw new Error('TRADING socket is not connected or is destroyed');
        }
    }
}
