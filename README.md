# Employee-Attendance-System
Real Time Data using NestJs, ReactJs and Websockets



https://user-images.githubusercontent.com/26713649/193449051-4d928ff7-5827-4c5e-a7a3-1d1f3372cd55.mov


## Usage

  Manage employee and see real time data updates.

## Development

   ``` git clone https://github.com/Mickaz89/Employee-Attendance-System.git ```
   ### Client
   Provide env variables (see .env.example)

      cd client
      npm install
      npm start


   ### Server
   Provide env variables (see .env.example)

   Be sure to have mongo installed and running on your local machine
   
   Create at least one User 
   

- POST /user
```typescript

export enum Status {
  WORKING = 'working',
  VACATION = 'vacation',
  SICKNESS = 'sickness',
}

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEnum(Status)
  status: Status;
}
```

      cd server
      npm install
      npm run start:dev

