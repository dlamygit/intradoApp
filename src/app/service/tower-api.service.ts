import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { User } from '../Model/user';

@Injectable({
  providedIn: 'root'
})
export class TowerAPIService {

  constructor(private http: HttpClient) { }


  url = "https://172.10.7.13/api/login";
  url2 = "http://172.10.7.13/api/v2/job_templates/10/launch";

  startJob(){  
   
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'X-CSRFToken': 'OF5VMAnMqgsCwiuBRMzsul0thU2RxrQmnsOHk1cNHAwGy7q42IsOOMvZEpQgs5rX',
        'Authorization': 'Basic ' +  btoa('admin:admin'),
        'Cookie':'csrftoken=OF5VMAnMqgsCwiuBRMzsul0thU2RxrQmnsOHk1cNHAwGy7q42IsOOMvZEpQgs5rX'
      })
    };
    

    return this.http.post(this.url2,{},httpOptions);
    
  }

  login(){     
    return this.http.get(this.url,{ observe: 'response' });
  }
}

