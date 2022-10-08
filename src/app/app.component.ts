import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  newMemberName = '';
  errorMessage = '';
  members: string[] = [];
  numberOfTeams: number | '' = '';
  // This will be an array of array of strings - [['', ''], ['', '']]
  teams: string[][] = [];

  onInput(addMemberInput: string) {
    this.newMemberName = addMemberInput;
  }

  onTeamsInput(numberOfTeams: string) {
    this.numberOfTeams = Number(numberOfTeams);
  }

  // Click handler for add member button
  addMember() {
    if (!this.newMemberName) {
      this.errorMessage = "Name can't be empty";
      return;
    }

    this.members.push(this.newMemberName);
    this.newMemberName = '';
    this.errorMessage = '';
    console.log(this.members);
  }

  // Logic for generating team
  generateTeams() {
    if (!this.numberOfTeams || this.numberOfTeams <= 0) {
      this.errorMessage = "Invalid number of teams"
      return;
    }

    if(this.members.length < this.numberOfTeams) {
      this.errorMessage = "Not enough members"
      return
    }

    this.errorMessage = ""
    // Copy of the memebers array
    const allMembers = [...this.members];

    while (allMembers.length) {
      for (let i = 0; i < this.numberOfTeams; i++) {
        const randomIndex = Math.floor(Math.random() * allMembers.length);
        // Remove the randomIndex element and store it into a variable - it will return an array
        const member = allMembers.splice(randomIndex, 1)[0];

        if (!member) break;

        if (this.teams[i]) {
          this.teams[i].push(member);
        } else {
          this.teams[i] = [member];
        }
      }
    }

    this.members = []
    this.numberOfTeams = ''
  }
}
