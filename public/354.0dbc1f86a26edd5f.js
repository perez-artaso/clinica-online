"use strict";(self.webpackChunkclinica_online=self.webpackChunkclinica_online||[]).push([[354],{6354:(q,M,m)=>{m.r(M),m.d(M,{ProfileModule:()=>F});var P=m(6895),a=m(433),A=m(9051),d=m(8495),f=m(3333),e=m(4650),_=m(9181),k=m(7556),g=m(8709),b=m(4707),u=m(2340),C=m(1481);let Z=(()=>{class c{constructor(i,t,o){this.sanitizer=i,this.profiles=t,this.imagesService=o,this.profile=new f.d,this.profileImages=new d.v,this.specialistProfileForm=new a.cw({name:new a.NI("",a.kI.required),last_name:new a.NI("",a.kI.required),age:new a.NI(0,a.kI.compose([a.kI.required,a.kI.min(18),a.kI.max(120)])),id_number:new a.NI("",a.kI.compose([a.kI.required,a.kI.pattern(/[0-9]{1,3}\.[0-9]{3}\.[0-9]{3}/)])),user_email:new a.NI("",a.kI.compose([a.kI.required,a.kI.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]))}),this.uploadImageErrorOcurred=!1,this.profileImageUrl=this.getSanitizedSrc(u.N.templateImg)}ngOnInit(){this.disableFields()}ngOnChanges(i){this.profileImageUrl=this.getSanitizedSrc(i.profileImages.currentValue.images[0]?i.profileImages.currentValue.images[0]:u.N.templateImg),i.profile&&(this.profile=new f.d(i.profile.currentValue.uid,i.profile.currentValue.name,i.profile.currentValue.last_name,i.profile.currentValue.age,i.profile.currentValue.id_number,i.profile.currentValue.user_email,i.profile.currentValue.role,i.profile.currentValue.approved,i.profile.currentValue.specialities),this.profile.setId(i.profile.currentValue.id),this.specialistProfileForm.controls.name.setValue(i.profile.currentValue.name),this.specialistProfileForm.controls.last_name.setValue(i.profile.currentValue.last_name),this.specialistProfileForm.controls.age.setValue(i.profile.currentValue.age),this.specialistProfileForm.controls.id_number.setValue(i.profile.currentValue.id_number),this.specialistProfileForm.controls.user_email.setValue(i.profile.currentValue.user_email))}getSanitizedSrc(i){return this.sanitizer.bypassSecurityTrustResourceUrl("data:image/jpg;base64,"+i)}uploadNewProfileImage(i){this.convertFile(i.target.files[0]).subscribe(t=>{this.profileImages.images[0]=t,console.log(t),this.imagesService.updateDocument(this.profileImages.id,this.profileImages).catch(o=>{this.uploadImageErrorOcurred=!0,console.dir(o)})})}convertFile(i){const t=new b.t(1),o=new FileReader;return o.readAsBinaryString(i),o.onload=l=>{l&&l.target&&l.target.result&&t.next(btoa(l.target.result.toString()))},t}disableFields(){this.specialistProfileForm.controls.name.disable(),this.specialistProfileForm.controls.last_name.disable(),this.specialistProfileForm.controls.age.disable(),this.specialistProfileForm.controls.id_number.disable(),this.specialistProfileForm.controls.user_email.disable()}editFieldRequest(i,t,o,l){i.style.display="none",t.style.display="inline-block",o.style.display="inline-block",this.specialistProfileForm.controls[l].enable()}cancel(i,t,o,l){i.style.display="inline-block",t.style.display="none",o.style.display="none",this.specialistProfileForm.controls[l].disable()}update(i,t,o,l){this.specialistProfileForm.controls[l].valid&&(this.profile[l]=this.specialistProfileForm.controls[l].value,console.dir(this.profile),this.profiles.updateDocument(this.profile.id,this.profile.getLiteralObjectRepresentation()).then(()=>{i.style.display="inline-block",t.style.display="none",o.style.display="none",this.specialistProfileForm.controls[l].disable()}).catch(n=>console.dir(n)))}}return c.\u0275fac=function(i){return new(i||c)(e.Y36(C.H7),e.Y36(_.H),e.Y36(g.x))},c.\u0275cmp=e.Xpm({type:c,selectors:[["app-specialist-profile"]],inputs:{profile:"profile",profileImages:"profileImages"},features:[e.TTD],decls:72,vars:2,consts:[["id","form-container",3,"formGroup"],["id","image-container"],["id","image-and-button"],["id","profile-image",3,"src"],["id","change-image-btn",1,"btn",3,"click"],[1,"bi","bi-pencil",2,"margin-right","1rem"],["type","file",2,"visibility","hidden","height","0px","width","0px","margin","0","padding","0",3,"change"],["profileImgInput",""],[1,"row"],[1,"col-lg-6"],[1,"form-group"],["for","name"],[1,"bi","bi-pencil-fill",3,"click"],["editName",""],[1,"bi","bi-check-square-fill","edition-btn",3,"click"],["confirmName",""],[1,"bi","bi-x-square-fill","edition-btn",3,"click"],["cancelName",""],["type","text","name","name","id","name","formControlName","name",1,"form-control"],["for","last_name"],["editLastname",""],["confirmLastname",""],["cancelLastName",""],["type","text","name","last_name","id","last_name","formControlName","last_name",1,"form-control"],["for","age"],["editAge",""],["confirmAge",""],["cancelAge",""],["type","text","name","age","id","age","formControlName","age",1,"form-control"],["for","id_number"],["editIdNumber",""],["confirmIdNumber",""],["cancelIdNumber",""],["type","text","name","id_number","id","id_number","formControlName","id_number",1,"form-control"],["for","user_email"],["editEmail",""],["confirmEmail",""],["cancelEmail",""],["type","text","name","user_email","id","user_email","formControlName","user_email",1,"form-control"],[1,"col-lg-6","d-flex","align-items-center","justify-content-center"],["for","specialities-btn"],["id","specialities-btn","name","specialities-btn",1,"form-control"]],template:function(i,t){if(1&i){const o=e.EpF();e.TgZ(0,"div",0)(1,"div",1)(2,"div",2),e._UZ(3,"img",3),e.TgZ(4,"button",4),e.NdJ("click",function(){e.CHM(o);const r=e.MAs(8);return e.KtG(r.click())}),e._UZ(5,"i",5),e._uU(6,"Cambiar Imagen "),e.qZA(),e.TgZ(7,"input",6,7),e.NdJ("change",function(r){return t.uploadNewProfileImage(r)}),e.qZA()()(),e.TgZ(9,"div",8)(10,"div",9)(11,"div",10)(12,"label",11),e._uU(13," Nombre "),e.TgZ(14,"i",12,13),e.NdJ("click",function(){e.CHM(o);const r=e.MAs(15),n=e.MAs(17),s=e.MAs(19);return e.KtG(t.editFieldRequest(r,n,s,"name"))}),e.qZA(),e.TgZ(16,"i",14,15),e.NdJ("click",function(){e.CHM(o);const r=e.MAs(15),n=e.MAs(17),s=e.MAs(19);return e.KtG(t.update(r,n,s,"name"))}),e.qZA(),e.TgZ(18,"i",16,17),e.NdJ("click",function(){e.CHM(o);const r=e.MAs(15),n=e.MAs(17),s=e.MAs(19);return e.KtG(t.cancel(r,n,s,"name"))}),e.qZA()(),e._UZ(20,"input",18),e.qZA()(),e.TgZ(21,"div",9)(22,"div",10)(23,"label",19),e._uU(24," Apellido "),e.TgZ(25,"i",12,20),e.NdJ("click",function(){e.CHM(o);const r=e.MAs(26),n=e.MAs(28),s=e.MAs(30);return e.KtG(t.editFieldRequest(r,n,s,"last_name"))}),e.qZA(),e.TgZ(27,"i",14,21),e.NdJ("click",function(){e.CHM(o);const r=e.MAs(26),n=e.MAs(28),s=e.MAs(30);return e.KtG(t.update(r,n,s,"last_name"))}),e.qZA(),e.TgZ(29,"i",16,22),e.NdJ("click",function(){e.CHM(o);const r=e.MAs(26),n=e.MAs(28),s=e.MAs(30);return e.KtG(t.cancel(r,n,s,"last_name"))}),e.qZA()(),e._UZ(31,"input",23),e.qZA()()(),e.TgZ(32,"div",8)(33,"div",9)(34,"div",10)(35,"label",24),e._uU(36," Edad "),e.TgZ(37,"i",12,25),e.NdJ("click",function(){e.CHM(o);const r=e.MAs(38),n=e.MAs(40),s=e.MAs(42);return e.KtG(t.editFieldRequest(r,n,s,"age"))}),e.qZA(),e.TgZ(39,"i",14,26),e.NdJ("click",function(){e.CHM(o);const r=e.MAs(38),n=e.MAs(40),s=e.MAs(42);return e.KtG(t.update(r,n,s,"age"))}),e.qZA(),e.TgZ(41,"i",16,27),e.NdJ("click",function(){e.CHM(o);const r=e.MAs(38),n=e.MAs(40),s=e.MAs(42);return e.KtG(t.cancel(r,n,s,"age"))}),e.qZA()(),e._UZ(43,"input",28),e.qZA()(),e.TgZ(44,"div",9)(45,"div",10)(46,"label",29),e._uU(47," DNI "),e.TgZ(48,"i",12,30),e.NdJ("click",function(){e.CHM(o);const r=e.MAs(49),n=e.MAs(51),s=e.MAs(53);return e.KtG(t.editFieldRequest(r,n,s,"id_number"))}),e.qZA(),e.TgZ(50,"i",14,31),e.NdJ("click",function(){e.CHM(o);const r=e.MAs(49),n=e.MAs(51),s=e.MAs(53);return e.KtG(t.update(r,n,s,"id_number"))}),e.qZA(),e.TgZ(52,"i",16,32),e.NdJ("click",function(){e.CHM(o);const r=e.MAs(49),n=e.MAs(51),s=e.MAs(53);return e.KtG(t.cancel(r,n,s,"id_number"))}),e.qZA()(),e._UZ(54,"input",33),e.qZA()()(),e.TgZ(55,"div",8)(56,"div",9)(57,"div",10)(58,"label",34),e._uU(59," De "),e.TgZ(60,"i",12,35),e.NdJ("click",function(){e.CHM(o);const r=e.MAs(61),n=e.MAs(63),s=e.MAs(65);return e.KtG(t.editFieldRequest(r,n,s,"user_email"))}),e.qZA(),e.TgZ(62,"i",14,36),e.NdJ("click",function(){e.CHM(o);const r=e.MAs(61),n=e.MAs(63),s=e.MAs(65);return e.KtG(t.update(r,n,s,"user_email"))}),e.qZA(),e.TgZ(64,"i",16,37),e.NdJ("click",function(){e.CHM(o);const r=e.MAs(61),n=e.MAs(63),s=e.MAs(65);return e.KtG(t.cancel(r,n,s,"user_email"))}),e.qZA()(),e._UZ(66,"input",38),e.qZA()(),e.TgZ(67,"div",39)(68,"div",10),e._UZ(69,"label",40),e.TgZ(70,"button",41),e._uU(71," Mis Especialidades "),e.qZA()()()()()}2&i&&(e.Q6J("formGroup",t.specialistProfileForm),e.xp6(3),e.Q6J("src",t.profileImageUrl,e.LSH))},dependencies:[a.Fj,a.JJ,a.JL,a.sg,a.u],styles:["#mms-container[_ngcontent-%COMP%]{display:flex;overflow:hidden;width:65vw;margin:0 auto}.mms[_ngcontent-%COMP%]{min-width:100%;transition:all 1s ease-in-out}#form-container[_ngcontent-%COMP%]{padding:1rem;background-color:var(--light);border-radius:10px;width:65vw;margin:2rem auto 0rem;border:3rem var(--dark) solid}@media (max-width: 780px){#mms-container[_ngcontent-%COMP%], #form-container[_ngcontent-%COMP%]{width:80vw}}#image-container[_ngcontent-%COMP%]{background-color:var(--light);padding:0;display:flex;align-items:center;flex-direction:column;gap:1rem;margin:0rem}#profile-image[_ngcontent-%COMP%]{border-radius:100%;max-width:200px}#change-image-btn[_ngcontent-%COMP%]{background-color:var(--dark);color:#fff;margin-left:1rem;font-size:x-large;border:solid 1px var(--dark)}#image-and-button[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:center;align-items:center;gap:2rem;padding:2rem;border-radius:1rem}label[_ngcontent-%COMP%]{font-weight:700;font-size:x-large;margin:1rem 0rem}input[_ngcontent-%COMP%]{font-size:x-large}i[_ngcontent-%COMP%]{margin-left:1rem}i[_ngcontent-%COMP%]:hover{cursor:pointer}i[_ngcontent-%COMP%]:active{font-size:large}.edition-btn[_ngcontent-%COMP%]{display:none}#specialities-btn[_ngcontent-%COMP%]{background-color:var(--dark);color:#fff;font-size:x-large;border:none}#specialities-btn[_ngcontent-%COMP%]:active{transform:scale(.95)}"]}),c})();var h=m(7101);let I=(()=>{class c{constructor(i,t,o){this.sanitizer=i,this.profiles=t,this.imagesService=o,this.profile=new h.N,this.profileImages=new d.v,this.patientProfileForm=new a.cw({name:new a.NI("",a.kI.required),last_name:new a.NI("",a.kI.required),age:new a.NI(0,a.kI.compose([a.kI.required,a.kI.min(18),a.kI.max(120)])),id_number:new a.NI("",a.kI.compose([a.kI.required,a.kI.pattern(/[0-9]{1,3}\.[0-9]{3}\.[0-9]{3}/)])),user_email:new a.NI("",a.kI.compose([a.kI.required,a.kI.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]))}),this.uploadImageErrorOcurred=!1,this.profileImageUrl=this.getSanitizedSrc(u.N.templateImg)}ngOnInit(){this.disableFields()}ngOnChanges(i){this.profileImageUrl=this.getSanitizedSrc(i.profileImages.currentValue.images[0]?i.profileImages.currentValue.images[0]:u.N.templateImg),i.profile&&(this.profile=new h.N(i.profile.currentValue.uid,i.profile.currentValue.name,i.profile.currentValue.last_name,i.profile.currentValue.age,i.profile.currentValue.id_number,i.profile.currentValue.user_email,i.profile.currentValue.role),this.profile.setId(i.profile.currentValue.id),this.patientProfileForm.controls.name.setValue(i.profile.currentValue.name),this.patientProfileForm.controls.last_name.setValue(i.profile.currentValue.last_name),this.patientProfileForm.controls.age.setValue(i.profile.currentValue.age),this.patientProfileForm.controls.id_number.setValue(i.profile.currentValue.id_number),this.patientProfileForm.controls.user_email.setValue(i.profile.currentValue.user_email))}getSanitizedSrc(i){return this.sanitizer.bypassSecurityTrustResourceUrl("data:image/jpg;base64,"+i)}uploadNewProfileImage(i){this.convertFile(i.target.files[0]).subscribe(t=>{this.profileImages.images[0]=t,console.log(t),this.imagesService.updateDocument(this.profileImages.id,this.profileImages).catch(o=>{this.uploadImageErrorOcurred=!0,console.dir(o)})})}convertFile(i){const t=new b.t(1),o=new FileReader;return o.readAsBinaryString(i),o.onload=l=>{l&&l.target&&l.target.result&&t.next(btoa(l.target.result.toString()))},t}disableFields(){this.patientProfileForm.controls.name.disable(),this.patientProfileForm.controls.last_name.disable(),this.patientProfileForm.controls.age.disable(),this.patientProfileForm.controls.id_number.disable(),this.patientProfileForm.controls.user_email.disable()}editFieldRequest(i,t,o,l){i.style.display="none",t.style.display="inline-block",o.style.display="inline-block",this.patientProfileForm.controls[l].enable()}cancel(i,t,o,l){i.style.display="inline-block",t.style.display="none",o.style.display="none",this.patientProfileForm.controls[l].disable()}update(i,t,o,l){this.patientProfileForm.controls[l].valid&&(this.profile[l]=this.patientProfileForm.controls[l].value,this.profiles.updateDocument(this.profile.id,this.profile.getLiteralObjectRepresentation()).then(()=>{i.style.display="inline-block",t.style.display="none",o.style.display="none",this.patientProfileForm.controls[l].disable()}).catch(n=>console.dir(n)))}}return c.\u0275fac=function(i){return new(i||c)(e.Y36(C.H7),e.Y36(_.H),e.Y36(g.x))},c.\u0275cmp=e.Xpm({type:c,selectors:[["app-patient-profile"]],inputs:{profile:"profile",profileImages:"profileImages"},features:[e.TTD],decls:67,vars:2,consts:[["id","form-container",3,"formGroup"],["id","image-container"],["id","image-and-button"],["id","profile-image",3,"src"],["id","change-image-btn",1,"btn",3,"click"],[1,"bi","bi-pencil",2,"margin-right","1rem"],["type","file",2,"visibility","hidden","height","0px","width","0px","margin","0","padding","0",3,"change"],["profileImgInput",""],[1,"row"],[1,"col-lg-6"],[1,"form-group"],["for","name"],[1,"bi","bi-pencil-fill",3,"click"],["editName",""],[1,"bi","bi-check-square-fill","edition-btn",3,"click"],["confirmName",""],[1,"bi","bi-x-square-fill","edition-btn",3,"click"],["cancelName",""],["type","text","name","name","id","name","formControlName","name",1,"form-control"],["for","last_name"],["editLastname",""],["confirmLastname",""],["cancelLastName",""],["type","text","name","last_name","id","last_name","formControlName","last_name",1,"form-control"],["for","age"],["editAge",""],["confirmAge",""],["cancelAge",""],["type","text","name","age","id","age","formControlName","age",1,"form-control"],["for","id_number"],["editIdNumber",""],["confirmIdNumber",""],["cancelIdNumber",""],["type","text","name","id_number","id","id_number","formControlName","id_number",1,"form-control"],["for","user_email"],["editEmail",""],["confirmEmail",""],["cancelEmail",""],["type","text","name","user_email","id","user_email","formControlName","user_email",1,"form-control"]],template:function(i,t){if(1&i){const o=e.EpF();e.TgZ(0,"div",0)(1,"div",1)(2,"div",2),e._UZ(3,"img",3),e.TgZ(4,"button",4),e.NdJ("click",function(){e.CHM(o);const r=e.MAs(8);return e.KtG(r.click())}),e._UZ(5,"i",5),e._uU(6,"Cambiar Imagen "),e.qZA(),e.TgZ(7,"input",6,7),e.NdJ("change",function(r){return t.uploadNewProfileImage(r)}),e.qZA()()(),e.TgZ(9,"div",8)(10,"div",9)(11,"div",10)(12,"label",11),e._uU(13," Nombre "),e.TgZ(14,"i",12,13),e.NdJ("click",function(){e.CHM(o);const r=e.MAs(15),n=e.MAs(17),s=e.MAs(19);return e.KtG(t.editFieldRequest(r,n,s,"name"))}),e.qZA(),e.TgZ(16,"i",14,15),e.NdJ("click",function(){e.CHM(o);const r=e.MAs(15),n=e.MAs(17),s=e.MAs(19);return e.KtG(t.update(r,n,s,"name"))}),e.qZA(),e.TgZ(18,"i",16,17),e.NdJ("click",function(){e.CHM(o);const r=e.MAs(15),n=e.MAs(17),s=e.MAs(19);return e.KtG(t.cancel(r,n,s,"name"))}),e.qZA()(),e._UZ(20,"input",18),e.qZA()(),e.TgZ(21,"div",9)(22,"div",10)(23,"label",19),e._uU(24," Apellido "),e.TgZ(25,"i",12,20),e.NdJ("click",function(){e.CHM(o);const r=e.MAs(26),n=e.MAs(28),s=e.MAs(30);return e.KtG(t.editFieldRequest(r,n,s,"last_name"))}),e.qZA(),e.TgZ(27,"i",14,21),e.NdJ("click",function(){e.CHM(o);const r=e.MAs(26),n=e.MAs(28),s=e.MAs(30);return e.KtG(t.update(r,n,s,"last_name"))}),e.qZA(),e.TgZ(29,"i",16,22),e.NdJ("click",function(){e.CHM(o);const r=e.MAs(26),n=e.MAs(28),s=e.MAs(30);return e.KtG(t.cancel(r,n,s,"last_name"))}),e.qZA()(),e._UZ(31,"input",23),e.qZA()()(),e.TgZ(32,"div",8)(33,"div",9)(34,"div",10)(35,"label",24),e._uU(36," Edad "),e.TgZ(37,"i",12,25),e.NdJ("click",function(){e.CHM(o);const r=e.MAs(38),n=e.MAs(40),s=e.MAs(42);return e.KtG(t.editFieldRequest(r,n,s,"age"))}),e.qZA(),e.TgZ(39,"i",14,26),e.NdJ("click",function(){e.CHM(o);const r=e.MAs(38),n=e.MAs(40),s=e.MAs(42);return e.KtG(t.update(r,n,s,"age"))}),e.qZA(),e.TgZ(41,"i",16,27),e.NdJ("click",function(){e.CHM(o);const r=e.MAs(38),n=e.MAs(40),s=e.MAs(42);return e.KtG(t.cancel(r,n,s,"age"))}),e.qZA()(),e._UZ(43,"input",28),e.qZA()(),e.TgZ(44,"div",9)(45,"div",10)(46,"label",29),e._uU(47," DNI "),e.TgZ(48,"i",12,30),e.NdJ("click",function(){e.CHM(o);const r=e.MAs(49),n=e.MAs(51),s=e.MAs(53);return e.KtG(t.editFieldRequest(r,n,s,"id_number"))}),e.qZA(),e.TgZ(50,"i",14,31),e.NdJ("click",function(){e.CHM(o);const r=e.MAs(49),n=e.MAs(51),s=e.MAs(53);return e.KtG(t.update(r,n,s,"id_number"))}),e.qZA(),e.TgZ(52,"i",16,32),e.NdJ("click",function(){e.CHM(o);const r=e.MAs(49),n=e.MAs(51),s=e.MAs(53);return e.KtG(t.cancel(r,n,s,"id_number"))}),e.qZA()(),e._UZ(54,"input",33),e.qZA()()(),e.TgZ(55,"div",8)(56,"div",9)(57,"div",10)(58,"label",34),e._uU(59," De "),e.TgZ(60,"i",12,35),e.NdJ("click",function(){e.CHM(o);const r=e.MAs(61),n=e.MAs(63),s=e.MAs(65);return e.KtG(t.editFieldRequest(r,n,s,"user_email"))}),e.qZA(),e.TgZ(62,"i",14,36),e.NdJ("click",function(){e.CHM(o);const r=e.MAs(61),n=e.MAs(63),s=e.MAs(65);return e.KtG(t.update(r,n,s,"user_email"))}),e.qZA(),e.TgZ(64,"i",16,37),e.NdJ("click",function(){e.CHM(o);const r=e.MAs(61),n=e.MAs(63),s=e.MAs(65);return e.KtG(t.cancel(r,n,s,"user_email"))}),e.qZA()(),e._UZ(66,"input",38),e.qZA()()()()}2&i&&(e.Q6J("formGroup",t.patientProfileForm),e.xp6(3),e.Q6J("src",t.profileImageUrl,e.LSH))},dependencies:[a.Fj,a.JJ,a.JL,a.sg,a.u],styles:["#mms-container[_ngcontent-%COMP%]{display:flex;overflow:hidden;width:65vw;margin:0 auto}.mms[_ngcontent-%COMP%]{min-width:100%;transition:all 1s ease-in-out}#form-container[_ngcontent-%COMP%]{padding:1rem;background-color:var(--light);border-radius:10px;width:65vw;margin:2rem auto 0rem;border:3rem var(--dark) solid}@media (max-width: 780px){#mms-container[_ngcontent-%COMP%], #form-container[_ngcontent-%COMP%]{width:80vw}}#image-container[_ngcontent-%COMP%]{background-color:var(--light);padding:0;display:flex;align-items:center;flex-direction:column;gap:1rem;margin:0rem}#profile-image[_ngcontent-%COMP%]{border-radius:100%;max-width:200px}#change-image-btn[_ngcontent-%COMP%]{background-color:var(--dark);color:#fff;margin-left:1rem;font-size:x-large;border:solid 1px var(--dark)}#image-and-button[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:center;align-items:center;gap:2rem;padding:2rem;border-radius:1rem}label[_ngcontent-%COMP%]{font-weight:700;font-size:x-large;margin:1rem 0rem}input[_ngcontent-%COMP%]{font-size:x-large}i[_ngcontent-%COMP%]{margin-left:1rem}i[_ngcontent-%COMP%]:hover{cursor:pointer}i[_ngcontent-%COMP%]:active{font-size:large}.edition-btn[_ngcontent-%COMP%]{display:none}#specialities-btn[_ngcontent-%COMP%]{background-color:var(--dark);color:#fff;font-size:x-large;border:none}#specialities-btn[_ngcontent-%COMP%]:active{transform:scale(.95)}"]}),c})();function v(c,p){if(1&c&&e._UZ(0,"app-specialist-profile",1),2&c){const i=e.oxw();e.Q6J("profile",i.currentProfile)("profileImages",i.profileImages)}}function T(c,p){if(1&c&&e._UZ(0,"app-patient-profile",1),2&c){const i=e.oxw();e.Q6J("profile",i.currentProfile)("profileImages",i.profileImages)}}const y=[{path:"",children:[{path:"my-profile",component:(()=>{class c{constructor(i,t,o){this.profiles=i,this.auth=t,this.profileImagesService=o,this.currentProfile=new f.d,this.profileImages=new d.v}ngOnInit(){this.currentProfile=this.auth.GetCurrentUserProfile(),this.profileImagesService.getImagesByUID(this.currentProfile.uid).subscribe(i=>{this.profileImages=i[0]})}}return c.\u0275fac=function(i){return new(i||c)(e.Y36(_.H),e.Y36(k.e),e.Y36(g.x))},c.\u0275cmp=e.Xpm({type:c,selectors:[["app-my-profile"]],decls:2,vars:2,consts:[[3,"profile","profileImages",4,"ngIf"],[3,"profile","profileImages"]],template:function(i,t){1&i&&(e.YNc(0,v,1,2,"app-specialist-profile",0),e.YNc(1,T,1,2,"app-patient-profile",0)),2&i&&(e.Q6J("ngIf",1==t.currentProfile.role&&""!=t.currentProfile.name),e.xp6(1),e.Q6J("ngIf",0==t.currentProfile.role&&""!=t.currentProfile.name))},dependencies:[P.O5,Z,I]}),c})()}]}];let N=(()=>{class c{}return c.\u0275fac=function(i){return new(i||c)},c.\u0275mod=e.oAB({type:c}),c.\u0275inj=e.cJS({imports:[A.Bz.forChild(y),A.Bz]}),c})(),F=(()=>{class c{}return c.\u0275fac=function(i){return new(i||c)},c.\u0275mod=e.oAB({type:c}),c.\u0275inj=e.cJS({imports:[P.ez,N,a.UX]}),c})()}}]);