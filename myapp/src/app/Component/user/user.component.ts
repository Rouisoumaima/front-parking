import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { UserServiceService } from 'src/app/Service/user.service';

@Component({
  selector: 'app-user',

  templateUrl: './user.component.html',

  styleUrls: ['./user.component.css'],
})
export class UserComponent {
  fieldTextType: boolean = true;
  ngOnInit(): void {
    this.getUsers();
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
  userData: any = {};

  userModify: any = {
    id: 0,

    nom: '',

    prenom: '',

    email: '',

    password: '',

    titre_poste: '',

    num_tel: '',

    dateEmbauche: '',

    priorite: '',

    voitures: {
      matricule: '',

      type: '',
    },
  };

  value!: string;

  ListUsers!: any[];

  constructor(private service: UserServiceService) {}

  formulaire: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),

    name: new FormControl('', [Validators.required]),

    lastname: new FormControl('', [Validators.required]),

    jobtitle: new FormControl('', [Validators.required]),

    PhoneNumber: new FormControl('', [
      Validators.required,
      Validators.maxLength(8),
    ]),

    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(
        /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
      ),
    ]),

    hiringdate: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/),
    ]),

    Priority: new FormControl('', [Validators.required]),

    Matricule: new FormControl('', [Validators.required]),

    Type: new FormControl('', [Validators.required]),
  });

  openModel(user: any) {
    this.fieldTextType = !this.fieldTextType;

    this.userModify = {
      id: user.id,

      nom: user.nom,

      prenom: user.prenom,

      email: user.email,

      titre_poste: user.titre_poste,

      password: user.password,

      num_tel: user.num_tel,

      dateEmbauche: user.dateEmbauche,

      priorite: user.priorite,

      voitures: {
        matricule: user.voitures.matricule,

        type: user.voitures.type,
      },
    };

    console.log(user);
  }

  check() {
    console.log(this.formulaire.get('email')?.value);

    const user = {
      email: this.formulaire.get('email')?.value,
      prenom: this.formulaire.get('name')?.value,
      nom: this.formulaire.get('lastname')?.value,
      titre_poste: this.formulaire.get('jobtitle')?.value,
      num_tel: this.formulaire.get('PhoneNumber')?.value,
      password: this.formulaire.get('password')?.value,
      dateEmbauche: this.formulaire.get('hiringdate')?.value,
      priorite: this.formulaire.get('Priority')?.value,

      voitures: {
        matricule: this.formulaire.get('Matricule')?.value,
        type: this.formulaire.get('Type')?.value,
      },
      
    };
    console.log(user);

    this.service.create(user).subscribe(
      (res: any) => {
        this.userData = res;

        this.getUsers();
      },

      (error: any) => {
        console.log(error);
      }
    );

    console.log(user);
  }

  getUsers() {
    this.service.get().subscribe((res: any) => {
      this.ListUsers = res;
    });
  }

  modifyUsers(f: NgForm) {
    this.service.modify(this.userModify).subscribe((res: any) => {
      alert('updated sucess !');
    });
  }

  deleteUser(id: any) {
    this.service.delete(id).subscribe((res: any) => {
      alert(res);
    });

    this.getUsers();
  }

  onSubmit(f: NgForm) {
    console.log(f.value);

    console.log(f.valid);
  }
}
