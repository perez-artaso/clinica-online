import {
    trigger,
    transition,
    style,
    query,
    group,
    animateChild,
    animate,
    keyframes,
  } from '@angular/animations';

export const fader = trigger('routeAnim', [
    transition('* => Fade', [

      style({
        position: 'relative'
      }),

      query(':enter, :leave', [
        style({
          position: 'absolute',
          top:0,
          left: 0,
          width: '100%'
        })
      ], {optional: true}),

      query(':enter', [
        style({
          opacity: '0'
        })
      ], {optional: true}),

      group([
        query(':leave', [
          style({display: 'block'}),
          animate(1000, style({
            transform: "translateY(-200px) scale(0)",
            opacity: '0'
          }))
        ], {optional: true}),
  
        query(':enter', [
          style({
            transform: 'translateY(100%) scale(0)'
          }),
          animate(
            1000,
            style({
              transform: 'translateX(0) scale(1)',
              opacity: '1'
            })
          )
        ], {optional: true})
      ])
      

    
    ]),

    transition('HomePage <=> Profile', [

      style({
        position: 'relative'
      }),

      query(':enter, :leave', [
        style({
          position: 'absolute',
          top:0,
          left: 0,
          width: '100%'
        })
      ], {optional: true}),

      query(':enter', [
        style({
          opacity: '0'
        })
      ], {optional: true}),

      group([
        query(':leave', [
          style({display: 'block'}),
          animate(1000, style({
            transform: "translateY(-200px)",
            opacity: '0'
          }))
        ], {optional: true}),
  
        query(':enter', [
          style({
            transform: 'translateY(100%)'
          }),
          animate(
            1000,
            style({
              transform: 'translateX(0)',
              opacity: '1'
            })
          )
        ], {optional: true})
      ])

    
    ])
  ])