import { Injectable } from '@nestjs/common';
import { PatchAccountDto } from './dto';
import { DbService } from 'src/db/db.service';

@Injectable()
export class AccountService {

  constructor(private db: DbService) { }

  async patchAccount(ownerId: number, body: PatchAccountDto) {
    return this.db.account.update({ where: { ownerId: ownerId }, data: { ...body } })
  }

  async getAccount(ownerId: number) {
    return this.db.account.findFirstOrThrow({ where: { ownerId: ownerId } })
  }

  async createAccount(id: number) {
    return this.db.account.create({
      data: {
        ownerId: id,
        isBlockingEnabled: false
      }
    })
  }
}
