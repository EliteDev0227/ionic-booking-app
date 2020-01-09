/**
 * Created by shadow-viper on 12/18/17.
 */


import {Component, OnInit} from "@angular/core";
import {NavParams} from "ionic-angular";
import {ApiProvider} from "../providers/services";
import {CustomBootstrap} from "../../app/BootstrapFirstRun";
@Component({
  selector:'rating-page',
  templateUrl:'rating.html'
})


export class ratingPage implements OnInit{
  beach_id:string;
  rating:any=[];
  myRate:number=1;
  write:boolean=false;
  review:any=[];
  requestPage:string='Rating';
  page:number=1;
  title:string='';
  perPage:number=0;
  myReview:string='';
  customer:any=[];
  infiniteCount:number=0;
  constructor(public navparam:NavParams,public api:ApiProvider,public configuration:CustomBootstrap){

    this.title=this.navparam.data.title
    }

  ngOnInit(){
    this.beach_id=this.navparam.data.id
    this.configuration.getStorage('login').then((a)=>{
    if(a && a.token){
      this.customer=a;
      this.ratings();
      this.reviews();
      
    }
  },error=>{})

  }
  ionViewWillEnter(){
 
    this.configuration.setRequestPage(this.requestPage);
  }

  ratings(){

    if(this.beach_id){
     
      this.api.get(`rating`,{beach_id:this.beach_id,customer_id:this.customer.id},{},false,true).subscribe(r=>{
        this.rating=r;
        
        if(this.rating.rated && !this.rating.reviewed){
          this.write=true;
        }else{
          this.write=false;
        }
      },error=>{

      })
    }
  }

  reviews(infiniteScroll?:any){

    if(this.beach_id){
      this.api.get(`reviews/${this.beach_id}/?offset=${this.infiniteCount}`,{},{},true).subscribe(r=>{
      
        if(infiniteScroll && infiniteScroll.state){
          if(this.review && this.review.items && this.review.items.length)
              this.review.items=this.review.items.concat(r.items);
          infiniteScroll.complete();
        }else{
          this.review=r;
        }
  

      },error=>{

      })
    }
  }

  newReview(){
    if(this.beach_id && this.customer && this.customer.id){
      let reviews={beach_id:this.beach_id,customer_id:this.customer.id,vote:this.myRate,review:this.myReview};
      this.api.post('review',reviews,{}).subscribe(r=>{
        this.api.AmError('Rating',r.message,[{text:'Close',handler:()=>{
          this.write=false;
          this.reviews()
        }}]);
      })
    }

    }


  newRating(){
    if(this.beach_id && this.customer && this.customer.id && this.myRate){
      let rateParam={beach_id:this.beach_id,customer_id:this.customer.id,vote:this.myRate};
      this.api.post('rating',rateParam,{}).subscribe(r=>{
        if(!this.rating.reviewed){
          this.write=true;
        }
      },error=>{})
    }
  }

  toggleRate(data:number){
    this.myRate=data;
  }

  more(infiniteScroll) {
    setTimeout(() => {
        this.infiniteCount+=10;
        this.reviews(infiniteScroll);
        if(this.infiniteCount>=this.review.length){
          infiniteScroll.enable(false);
          this.infiniteCount=this.review.length;
      }
    }, 300);
  }
}
