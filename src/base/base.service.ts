import { Injectable } from '@nestjs/common';

@Injectable()
export class BaseService {
    async base(){
        return({
            name: 'Prachaya',
            description: '',
            status: 'under construction',
            swagger_documentation: 'AT /swagger',
            backend_by: 'Manash Prajapati',
            github: 'https://github.com/Manash-sth',
            linkedin: 'https://www.linkedin.com/in/manash-prajapati/',
            email: 'manash.81142615@gmail.com'
        })
    }
}
