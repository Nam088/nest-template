import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    /**
     * Returns a simple hello message
     * @returns {string} A greeting message "Hello World!"
     */
    getHello(): string {
        return 'Hello World!';
    }
}
