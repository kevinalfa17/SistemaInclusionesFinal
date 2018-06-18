import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class RequestService {
    private service1: String;
    private service2: String;

    constructor(private http: Http) {
        this.service1 = "http://192.168.0.34/CE-Transaction";
        this.service2 = "http://192.168.0.34/CE-Authentication";
    }


 
    //Transaction service
    getConfig() {
        return this.http.get(this.service1 + '/ce/Config').map((res: Response) => res.json());
    }

    sendInclusion(request){
        return this.http.post(this.service1 + '/ce/Inclusions', request).map((res: Response) => res.json());
    }

    updateInclusion(request,id){
        console.log("update req" + JSON.stringify(request))
        return this.http.put(this.service1 + '/ce/Inclusions/Student?id='+id, request).map((res: Response) => res.json());
    }

    appealInclusion(id, request){
        return this.http.put(this.service1 + '/ce/Inclusions/StudentAppeal?id='+id, request).map((res: Response) => res.json());
    }

    sendRequirements(request){
        return this.http.post(this.service1 + '/ce/SkipRequirements', request).map((res: Response) => res.json());
    }

    updateRequirements(request,id){
        console.log("update req" + JSON.stringify(request))        
        return this.http.put(this.service1 + '/ce/SkipRequirements/Student?id='+id, request).map((res: Response) => res.json());
    }

    appealRequirements(id, request){
        return this.http.put(this.service1 + '/ce/SkipRequirements/StudentAppeal?id='+id, request).map((res: Response) => res.json());
    }

    sendRn(request){
        return this.http.post(this.service1 + '/ce/SkipRN', request).map((res: Response) => res.json());
    }

    updateRn(request,id){
        console.log("update req" + JSON.stringify(request))        
        return this.http.put(this.service1 + '/ce/SkipRN/Student?id='+id, request).map((res: Response) => res.json());
    }

    appealRn(id, request){

        console.log(this.service1 + '/ce/SkipRN/StudentAppeal?id='+id);
        console.log(JSON.stringify(request))
        return this.http.put(this.service1 + '/ce/SkipRN/StudentAppeal?id='+id, request).map((res: Response) => res.json());
    }

    getInclusion(id){
        return this.http.get(this.service1 + '/ce/Inclusions/Student?student='+id).map((res: Response) => res.json());
    }

    getRequirements(id){
        console.log("grequirements")
        console.log(this.service1 + '/ce/SkipRequirements/Student?student='+id)
        return this.http.get(this.service1 + '/ce/SkipRequirements/Student?student='+id).map((res: Response) => res.json());
    }

    getRn(id){
        return this.http.get(this.service1 + '/ce/SkipRN/Student?student='+id).map((res: Response) => res.json());
    }

    getSpecificInclusion(id){
        return this.http.get(this.service1 + '/ce/Inclusions/'+id).map((res: Response) => res.json());
    }

    getSpecificRequirement(id){
        return this.http.get(this.service1 + '/ce/SkipRequirements/'+id).map((res: Response) => res.json());
    }

    getSpecificRn(id){
        return this.http.get(this.service1 + '/ce/SkipRN/'+id).map((res: Response) => res.json());
    }

    deleteInclusion(request){
        return this.http.delete(this.service1 + '/ce/Inclusions/' + request).map((res: Response) => res.json());
    }

    deleteRequirements(request){
        return this.http.delete(this.service1 + '/ce/SkipRequirements/'+ request).map((res: Response) => res.json());
    }

    deleteRn(request){
        return this.http.delete(this.service1 + '/ce/SkipRN/'+ request).map((res: Response) => res.json());
    }

    getCourses() {
        return this.http.get(this.service1 + '/ce/Courses').map((res: Response) => res.json());
    }

    savePlan(request,id){
        console.log(JSON.stringify(request))
        console.log(this.service1 + '/ce/CoursePlan?student='+id)

        return this.http.post(this.service1 + '/ce/CoursePlan?student='+id, request).map((res: Response) => res.json());
    }

    getPlan(student) {
        return this.http.get(this.service1 + '/ce/CoursePlan?student='+student).map((res: Response) => res.json());
    }

    getNotifications(email){
        return this.http.get(this.service1 + '/ce/Notification?email='+email).map((res: Response) => res.json());
    }

    //Auth service
    updateProfile(request) {
        return this.http.put(this.service2 + '/ce/Students/Student?id='+request.carne, request).map((res: Response) => res.json());
    }

    login(request) {
        return this.http.post(this.service2 + '/ce/StudentAuth/Authenticate', request).map((res: Response) => res.json());
    }

    generateToken(request) {
        return this.http.post(this.service2 + '/ce/StudentAuth/Token', request).map((res: Response) => res.json());
    }

}