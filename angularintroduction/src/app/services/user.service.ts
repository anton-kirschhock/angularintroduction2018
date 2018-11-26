import { Injectable } from '@angular/core';

import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class UserService {
  public getAll(): User[] {
    return this.getUserList();
  }

  private getUserList(): User[] {
    return [
      {
        id: 1,
        firstName: 'Fielding',
        name: 'Bernardot',
        email: 'fbernardot0@dmoz.org',
        dateOfBirth: '28/08/1978'
      },
      {
        id: 2,
        firstName: 'Karmen',
        name: 'Chittey',
        email: 'kchittey1@tamu.edu',
        dateOfBirth: '12/10/2017'
      },
      {
        id: 3,
        firstName: 'Anna',
        name: 'Jakubowsky',
        email: 'ajakubowsky2@sakura.ne.jp',
        dateOfBirth: '28/03/1993'
      },
      {
        id: 4,
        firstName: 'Ari',
        name: 'Yare',
        email: 'ayare3@cloudflare.com',
        dateOfBirth: '28/03/1986'
      },
      {
        id: 5,
        firstName: 'Daisy',
        name: 'Frome',
        email: 'dfrome4@networkadvertising.org',
        dateOfBirth: '21/09/2016'
      },
      {
        id: 6,
        firstName: 'Jami',
        name: 'Rymell',
        email: 'jrymell5@wired.com',
        dateOfBirth: '14/10/2008'
      },
      {
        id: 7,
        firstName: 'Venita',
        name: 'Chatwood',
        email: 'vchatwood6@salon.com',
        dateOfBirth: '22/01/2001'
      },
      {
        id: 8,
        firstName: 'Saraann',
        name: 'Bridewell',
        email: 'sbridewell7@oakley.com',
        dateOfBirth: '28/06/1996'
      },
      {
        id: 9,
        firstName: 'Fionnula',
        name: 'Mundow',
        email: 'fmundow8@google.com',
        dateOfBirth: '20/01/1995'
      },
      {
        id: 10,
        firstName: 'Pembroke',
        name: 'Palfery',
        email: 'ppalfery9@wordpress.com',
        dateOfBirth: '03/07/2003'
      },
      {
        id: 11,
        firstName: 'Erhard',
        name: 'Lile',
        email: 'elilea@jiathis.com',
        dateOfBirth: '17/03/1992'
      },
      {
        id: 12,
        firstName: 'Reena',
        name: 'Fick',
        email: 'rfickb@uiuc.edu',
        dateOfBirth: '26/11/1985'
      },
      {
        id: 13,
        firstName: 'Lorie',
        name: 'Sowley',
        email: 'lsowleyc@cdc.gov',
        dateOfBirth: '16/10/1994'
      },
      {
        id: 14,
        firstName: 'Justis',
        name: 'Semiraz',
        email: 'jsemirazd@dropbox.com',
        dateOfBirth: '15/03/1995'
      },
      {
        id: 15,
        firstName: 'Allistir',
        name: 'Orlton',
        email: 'aorltone@fema.gov',
        dateOfBirth: '02/08/1991'
      },
      {
        id: 16,
        firstName: 'Theda',
        name: 'Dart',
        email: 'tdartf@oracle.com',
        dateOfBirth: '06/03/2011'
      },
      {
        id: 17,
        firstName: 'Dore',
        name: 'Tunnicliffe',
        email: 'dtunnicliffeg@smh.com.au',
        dateOfBirth: '30/06/2010'
      },
      {
        id: 18,
        firstName: 'Adore',
        name: 'Undy',
        email: 'aundyh@vinaora.com',
        dateOfBirth: '04/07/1993'
      },
      {
        id: 19,
        firstName: 'Wat',
        name: 'Guyet',
        email: 'wguyeti@rediff.com',
        dateOfBirth: '14/10/2003'
      },
      {
        id: 20,
        firstName: 'Giusto',
        name: 'MacCroary',
        email: 'gmaccroaryj@goo.ne.jp',
        dateOfBirth: '21/03/1993'
      }
    ];
  }
}
