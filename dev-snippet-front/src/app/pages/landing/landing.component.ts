import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatAnchor } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatChip, MatChipSet } from '@angular/material/chips';

@Component({
  selector: 'app-landing',
  imports: [
    RouterLink,
    MatAnchor,
    MatCardContent,
    MatCard,
    MatChipSet,
    MatChip
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {
  steps = [
    {
      number: '01',
      title: 'Save your snippet',
      desc: 'Paste your code, pick a language, add a title. Done in seconds.'
    },
    {
      number: '02',
      title: 'Organize with tags',
      desc: 'Group snippets into collections, tag by language or topic. Find anything instantly.'
    },
    {
      number: '03',
      title: 'Find it when you need it',
      desc: 'Full-text search across all your code. Hit ⌘K and get results instantly.'
    }
  ];

  features = [
    {
      icon: '🎨',
      title: 'Syntax highlighting',
      desc: 'Beautiful code display for 20+ languages out of the box.'
    },
    {
      icon: '🔒',
      title: 'Public & private',
      desc: 'Keep snippets private or share them via a unique URL.'
    },
    {
      icon: '📁',
      title: 'Collections',
      desc: 'Group related snippets into collections for any project.'
    },
    {
      icon: '⚡',
      title: 'Keyboard first',
      desc: 'Navigate and search without ever leaving your keyboard.'
    }
  ];
}
