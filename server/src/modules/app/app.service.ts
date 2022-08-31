import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `
    <p>App: costs-youtube<p>
    <p>Backend part<p>

    <a href="https://www.youtube.com/watch?v=TntnOmZ-yp8&ab_channel=SkillBlog">
    link tutoial
    </a>
    `;
  }
}
