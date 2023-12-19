import { of } from 'rxjs';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IonicModule, IonItem, IonList } from '@ionic/angular';

import { StorageCacheApiPage } from './storage-cache-api.page';
import { UserService } from 'src/app/services/user.service';
import { StorageApiService } from 'src/app/services/storage/storage-api.service';
import { UserCacheResponse } from './user.type';
import { By } from '@angular/platform-browser';

const MOCK_USER_DATA: any = {
  expiredAt: null,
  data: [
    {
      gender: 'male',
      name: {
        title: 'Monsieur',
        first: 'Raoul',
        last: 'Joly',
      },
      location: {
        street: {
          number: 9680,
          name: 'Rue des Ecrivains',
        },
        city: 'Trélex',
        state: 'Basel-Landschaft',
        country: 'Switzerland',
        postcode: 3191,
        coordinates: {
          latitude: '-64.0222',
          longitude: '-45.1617',
        },
        timezone: {
          offset: '-5:00',
          description: 'Eastern Time (US & Canada), Bogota, Lima',
        },
      },
      email: 'raoul.joly@example.com',
      login: {
        uuid: 'c73fbd20-9d53-4c92-9fd0-006f3e383e71',
        username: 'ticklishbird141',
        password: 'xxxxxx',
        salt: 'K1xlWLjL',
        md5: '9b0580e0a83ef927be88b10146c1efd7',
        sha1: '5d61134ec5f18737037f497b8ff72364fb5cdd12',
        sha256:
          'f382166bee6ef76cb3f345659af8f106e11b2d2c31fba90ba2d2c6e137618094',
      },
      dob: {
        date: '1945-09-26T23:53:07.566Z',
        age: 77,
      },
      registered: {
        date: '2009-11-23T11:01:43.455Z',
        age: 13,
      },
      phone: '079 252 94 04',
      cell: '079 490 43 53',
      id: {
        name: 'AVS',
        value: '756.9032.2544.98',
      },
      picture: {
        large: 'https://randomuser.me/api/portraits/men/96.jpg',
        medium: 'https://randomuser.me/api/portraits/med/men/96.jpg',
        thumbnail: 'https://randomuser.me/api/portraits/thumb/men/96.jpg',
      },
      nat: 'CH',
    },
    {
      gender: 'male',
      name: {
        title: 'Mr',
        first: 'Isaac',
        last: 'Vázquez',
      },
      location: {
        street: {
          number: 7085,
          name: 'Calle de Arturo Soria',
        },
        city: 'Cuenca',
        state: 'Canarias',
        country: 'Spain',
        postcode: 75319,
        coordinates: {
          latitude: '-10.2771',
          longitude: '114.6969',
        },
        timezone: {
          offset: '-10:00',
          description: 'Hawaii',
        },
      },
      email: 'isaac.vazquez@example.com',
      login: {
        uuid: '6e17685e-0544-4866-ad54-8f1b532b4364',
        username: 'crazydog487',
        password: 'joker1',
        salt: 'roxsBkms',
        md5: 'd066b32215843d7b3db565f051112c51',
        sha1: 'dd6085e3f159865c242e1750270773c0a5b73a6f',
        sha256:
          '5e1165ffd18f7b5d2aec0600538b2abd69f5d7a00d64ef767f9cf9e2d441fc13',
      },
      dob: {
        date: '1968-01-11T03:13:36.987Z',
        age: 55,
      },
      registered: {
        date: '2006-03-29T16:51:15.262Z',
        age: 16,
      },
      phone: '984-997-184',
      cell: '632-622-262',
      id: {
        name: 'DNI',
        value: '00598833-T',
      },
      picture: {
        large: 'https://randomuser.me/api/portraits/men/37.jpg',
        medium: 'https://randomuser.me/api/portraits/med/men/37.jpg',
        thumbnail: 'https://randomuser.me/api/portraits/thumb/men/37.jpg',
      },
      nat: 'ES',
    },
    {
      gender: 'female',
      name: {
        title: 'Madame',
        first: 'Pascale',
        last: 'Renaud',
      },
      location: {
        street: {
          number: 6680,
          name: 'Rue Abel-Gance',
        },
        city: 'Dorénaz',
        state: 'Uri',
        country: 'Switzerland',
        postcode: 8382,
        coordinates: {
          latitude: '-9.6532',
          longitude: '-118.4237',
        },
        timezone: {
          offset: '+3:00',
          description: 'Baghdad, Riyadh, Moscow, St. Petersburg',
        },
      },
      email: 'pascale.renaud@example.com',
      login: {
        uuid: '34742663-5c6f-4fb2-a753-a44394008fed',
        username: 'smallpeacock287',
        password: 'kittycat',
        salt: 'ApL3Fh4w',
        md5: 'd6ea68d963b039c97b97c2fdb3ce6834',
        sha1: '79b6fe1706148f5bfa7247986280965fe9fe9fb7',
        sha256:
          '7610af0d0f7194240796ffd51ce41b37c83fe585facdc8bd560e00ef864abe81',
      },
      dob: {
        date: '1995-04-04T02:55:04.177Z',
        age: 27,
      },
      registered: {
        date: '2014-01-16T12:44:21.296Z',
        age: 9,
      },
      phone: '078 617 10 82',
      cell: '076 972 24 77',
      id: {
        name: 'AVS',
        value: '756.2475.8747.29',
      },
      picture: {
        large: 'https://randomuser.me/api/portraits/women/51.jpg',
        medium: 'https://randomuser.me/api/portraits/med/women/51.jpg',
        thumbnail: 'https://randomuser.me/api/portraits/thumb/women/51.jpg',
      },
      nat: 'CH',
    },
    {
      gender: 'male',
      name: {
        title: 'Mr',
        first: 'Levi',
        last: 'Ramirez',
      },
      location: {
        street: {
          number: 5802,
          name: 'Victoria Street',
        },
        city: 'Newry',
        state: 'Greater Manchester',
        country: 'United Kingdom',
        postcode: 'RV7J 0AT',
        coordinates: {
          latitude: '-21.7189',
          longitude: '-39.9236',
        },
        timezone: {
          offset: '-11:00',
          description: 'Midway Island, Samoa',
        },
      },
      email: 'levi.ramirez@example.com',
      login: {
        uuid: 'c2bcd69a-53d7-4649-981e-58cc3e98eda9',
        username: 'greenlion570',
        password: 'freedom1',
        salt: 'boKN4i2h',
        md5: '86ad80eae089b64f968b98b1749795fa',
        sha1: '54d95ba7ab136c69605ba615f62c975fc1b981ab',
        sha256:
          '3a4e9a59a48253a39439035479daf97b48f74a1fe51ccd390ca87d3ad2652ab6',
      },
      dob: {
        date: '1963-06-09T07:03:07.893Z',
        age: 59,
      },
      registered: {
        date: '2004-01-15T06:40:13.626Z',
        age: 19,
      },
      phone: '016977 74210',
      cell: '07407 261369',
      id: {
        name: 'NINO',
        value: 'BM 60 80 46 T',
      },
      picture: {
        large: 'https://randomuser.me/api/portraits/men/57.jpg',
        medium: 'https://randomuser.me/api/portraits/med/men/57.jpg',
        thumbnail: 'https://randomuser.me/api/portraits/thumb/men/57.jpg',
      },
      nat: 'GB',
    },
    {
      gender: 'female',
      name: {
        title: 'Ms',
        first: 'Kreszenz',
        last: 'Ullmann',
      },
      location: {
        street: {
          number: 2942,
          name: 'Mühlenstraße',
        },
        city: 'Bad König',
        state: 'Hessen',
        country: 'Germany',
        postcode: 21832,
        coordinates: {
          latitude: '-59.1645',
          longitude: '89.7392',
        },
        timezone: {
          offset: '-1:00',
          description: 'Azores, Cape Verde Islands',
        },
      },
      email: 'kreszenz.ullmann@example.com',
      login: {
        uuid: '20d45ec4-37bc-437c-8db7-c3f749b09f96',
        username: 'happypeacock285',
        password: 'biggles',
        salt: 'vuFGIwmy',
        md5: '06412c5191f59a725248c4c58b884f77',
        sha1: 'ab36de63803ed84bb7cd7deb483f4a76287a8950',
        sha256:
          '74bfdc9e168c585fec9132f61c09d38cab8767b3538e75089359c43ca3c3e232',
      },
      dob: {
        date: '1967-06-02T07:57:40.478Z',
        age: 55,
      },
      registered: {
        date: '2010-07-22T17:43:00.267Z',
        age: 12,
      },
      phone: '0885-3874831',
      cell: '0177-3437802',
      id: {
        name: 'SVNR',
        value: '23 020667 U 853',
      },
      picture: {
        large: 'https://randomuser.me/api/portraits/women/22.jpg',
        medium: 'https://randomuser.me/api/portraits/med/women/22.jpg',
        thumbnail: 'https://randomuser.me/api/portraits/thumb/women/22.jpg',
      },
      nat: 'DE',
    },
    {
      gender: 'male',
      name: {
        title: 'Monsieur',
        first: 'Christof',
        last: 'Thomas',
      },
      location: {
        street: {
          number: 5581,
          name: 'Quai Charles-De-Gaulle',
        },
        city: 'Seuzach',
        state: 'Appenzell Innerrhoden',
        country: 'Switzerland',
        postcode: 5222,
        coordinates: {
          latitude: '4.8200',
          longitude: '-170.9799',
        },
        timezone: {
          offset: '+1:00',
          description: 'Brussels, Copenhagen, Madrid, Paris',
        },
      },
      email: 'christof.thomas@example.com',
      login: {
        uuid: '39ae2d25-6885-4196-b9ac-41e9bf6360e4',
        username: 'beautifulwolf268',
        password: 'printer',
        salt: 'ZhrgLcgJ',
        md5: '2d4f34f4c21780f96412eed1cb05ad31',
        sha1: '78d3ac160d85aea4c6497de21725fd17523aeb21',
        sha256:
          '700c95f7d8d25ea9abe6f3f3b85658d7f474640a249ae990315b23a31b9c1306',
      },
      dob: {
        date: '1947-08-13T00:07:54.439Z',
        age: 75,
      },
      registered: {
        date: '2009-06-29T05:39:59.586Z',
        age: 13,
      },
      phone: '078 864 46 01',
      cell: '077 246 37 02',
      id: {
        name: 'AVS',
        value: '756.5237.3483.00',
      },
      picture: {
        large: 'https://randomuser.me/api/portraits/men/13.jpg',
        medium: 'https://randomuser.me/api/portraits/med/men/13.jpg',
        thumbnail: 'https://randomuser.me/api/portraits/thumb/men/13.jpg',
      },
      nat: 'CH',
    },
    {
      gender: 'female',
      name: {
        title: 'Mrs',
        first: 'Mónica',
        last: 'Vega',
      },
      location: {
        street: {
          number: 3769,
          name: 'Calle de La Democracia',
        },
        city: 'Ferrol',
        state: 'La Rioja',
        country: 'Spain',
        postcode: 60225,
        coordinates: {
          latitude: '35.0915',
          longitude: '16.1654',
        },
        timezone: {
          offset: '-4:00',
          description: 'Atlantic Time (Canada), Caracas, La Paz',
        },
      },
      email: 'monica.vega@example.com',
      login: {
        uuid: '5b7b0f69-e2ab-4dde-bd53-414cb29e98e0',
        username: 'silverrabbit949',
        password: 'closeup',
        salt: 'TtyiZKIO',
        md5: '6317a3f9e7edb8b942f74777cf580311',
        sha1: '32699b2f029dc3aac0dec224b8fe1b88bad91216',
        sha256:
          'af1baf981e3b3b8746b2687d52ffc64b6b41fa5dc17f492b68670a24db565b64',
      },
      dob: {
        date: '1990-02-07T15:40:36.555Z',
        age: 33,
      },
      registered: {
        date: '2011-05-22T03:19:02.165Z',
        age: 11,
      },
      phone: '986-451-869',
      cell: '655-490-555',
      id: {
        name: 'DNI',
        value: '56414759-D',
      },
      picture: {
        large: 'https://randomuser.me/api/portraits/women/77.jpg',
        medium: 'https://randomuser.me/api/portraits/med/women/77.jpg',
        thumbnail: 'https://randomuser.me/api/portraits/thumb/women/77.jpg',
      },
      nat: 'ES',
    },
    {
      gender: 'female',
      name: {
        title: 'Madame',
        first: 'Susan',
        last: 'Menard',
      },
      location: {
        street: {
          number: 2389,
          name: 'Rue Barrier',
        },
        city: 'Astano',
        state: 'Schwyz',
        country: 'Switzerland',
        postcode: 2149,
        coordinates: {
          latitude: '23.5894',
          longitude: '-70.3676',
        },
        timezone: {
          offset: '+4:30',
          description: 'Kabul',
        },
      },
      email: 'susan.menard@example.com',
      login: {
        uuid: '1900dc9f-0c12-4152-97f0-2d5fb6410c1d',
        username: 'whitecat688',
        password: 'truck1',
        salt: 'OrL1cxrg',
        md5: '6e05c3d1ea02c88d337a23956b1cdc36',
        sha1: '24cbfa9745a3152e0e85bc320e7afa385554ecbf',
        sha256:
          'eccac02592cc24d4870ed4add477a2eab459cbcea773d7d889c5b4664f8baf4d',
      },
      dob: {
        date: '1966-02-09T00:24:56.955Z',
        age: 57,
      },
      registered: {
        date: '2019-01-20T09:38:56.304Z',
        age: 4,
      },
      phone: '078 205 12 69',
      cell: '077 484 09 56',
      id: {
        name: 'AVS',
        value: '756.7004.8296.21',
      },
      picture: {
        large: 'https://randomuser.me/api/portraits/women/39.jpg',
        medium: 'https://randomuser.me/api/portraits/med/women/39.jpg',
        thumbnail: 'https://randomuser.me/api/portraits/thumb/women/39.jpg',
      },
      nat: 'CH',
    },
    {
      gender: 'male',
      name: {
        title: 'Mr',
        first: 'Manthan',
        last: 'Prabhu',
      },
      location: {
        street: {
          number: 3318,
          name: 'Maharanipeta',
        },
        city: 'Jabalpur',
        state: 'Haryana',
        country: 'India',
        postcode: 15545,
        coordinates: {
          latitude: '10.4333',
          longitude: '-170.3093',
        },
        timezone: {
          offset: '+1:00',
          description: 'Brussels, Copenhagen, Madrid, Paris',
        },
      },
      email: 'manthan.prabhu@example.com',
      login: {
        uuid: '508b38ed-a3ab-4f2a-8988-94604a71c4a3',
        username: 'purplekoala987',
        password: 'christma',
        salt: 'Kr6sbsHB',
        md5: '4eeda1f8b64b712e373fcedb269930f8',
        sha1: '372b651b3a5b9d3fd809fd8f15d5e0a0eb333fbf',
        sha256:
          'aadc2986cc428fd27d32c6cd93cb3e269744e3e93d0a2d9582f5dd9d4d1e5e55',
      },
      dob: {
        date: '1995-01-18T20:27:10.710Z',
        age: 28,
      },
      registered: {
        date: '2013-12-27T11:51:53.893Z',
        age: 9,
      },
      phone: '7180450155',
      cell: '7022980648',
      id: {
        name: 'UIDAI',
        value: '148375152422',
      },
      picture: {
        large: 'https://randomuser.me/api/portraits/men/73.jpg',
        medium: 'https://randomuser.me/api/portraits/med/men/73.jpg',
        thumbnail: 'https://randomuser.me/api/portraits/thumb/men/73.jpg',
      },
      nat: 'IN',
    },
    {
      gender: 'female',
      name: {
        title: 'Mrs',
        first: 'Addison',
        last: 'Novak',
      },
      location: {
        street: {
          number: 865,
          name: 'Queen St',
        },
        city: 'Melbourne',
        state: 'Ontario',
        country: 'Canada',
        postcode: 'J2Y 2M2',
        coordinates: {
          latitude: '-28.9879',
          longitude: '58.6698',
        },
        timezone: {
          offset: '+4:30',
          description: 'Kabul',
        },
      },
      email: 'addison.novak@example.com',
      login: {
        uuid: 'f960367f-eb74-4d77-9fd3-b2f233adc510',
        username: 'yellowpeacock310',
        password: 'sf49ers',
        salt: 'E8Hk6bQH',
        md5: 'ab30666c484edb1bc5776f0789325811',
        sha1: 'c99c2d12981cbbb6db12d7a2cbd618c4f8b7e4d4',
        sha256:
          'ea8750249d58865709e89ffb2deb93d857595a1a9335a12821559bae635b60fe',
      },
      dob: {
        date: '1960-08-20T09:05:27.891Z',
        age: 62,
      },
      registered: {
        date: '2014-12-21T21:34:59.691Z',
        age: 8,
      },
      phone: 'U02 E42-4681',
      cell: 'R65 D79-5615',
      id: {
        name: 'SIN',
        value: '279239362',
      },
      picture: {
        large: 'https://randomuser.me/api/portraits/women/45.jpg',
        medium: 'https://randomuser.me/api/portraits/med/women/45.jpg',
        thumbnail: 'https://randomuser.me/api/portraits/thumb/women/45.jpg',
      },
      nat: 'CA',
    },
  ],
  createdAt: null,
};

describe('StorageCacheApiPage', () => {
  let component: StorageCacheApiPage;
  let fixture: ComponentFixture<StorageCacheApiPage>;
  let userService: UserService;
  let storageApiService: StorageApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StorageCacheApiPage],
      imports: [IonicModule.forRoot(), HttpClientTestingModule],
    }).compileComponents();

    userService = TestBed.inject(UserService);
    storageApiService = TestBed.inject(StorageApiService);

    fixture = TestBed.createComponent(StorageCacheApiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve 10 users', () => {
    spyOn(userService, 'getUsers').and.returnValue(of(MOCK_USER_DATA));

    component.ngOnInit();

    fixture.detectChanges();

    const list = fixture.debugElement.query(By.directive(IonList));

    const items = list.queryAll(By.directive(IonItem));

    expect(component).toBeTruthy();
    expect(component.users.length).toBe(items.length);
  });
});
