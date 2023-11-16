import { Controller, Get, Patch } from '@nestjs/common';

@Controller('account')
export class AccountController {

  @Get()
  getAccount(){
    
  }

  @Patch()
  patchAccount() {

  }

}
