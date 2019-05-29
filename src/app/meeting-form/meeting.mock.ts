export const meetings = [
  {
    id: 1,
    date: '5/02/2019',
    topics: [
      {
        id: 1,
        meetingId: 1, 
        tasks: [
          {
            assigned: 'Claudio Zurita',
            date: '18/05/2019',
            dueDate: Date,
            id: 1,
            status: 3,
            task: 'realizar esta',
            topicId: 1,
            track: [
              {
                date: '18/06/2019',
                id: 1,
                info: 'Se hizo tal cosa',
                taskId: 1,
              }
            ],
          },
          {
            assigned: 'Yaolin',
            date: '18/05/2019',
            dueDate: Date,
            id: 2,
            status: 2,
            task: 'Otra tarea mas para ya',
            topicId: 1,
            track: [
              {
                date: '18/06/2019',
                id: 2,
                info: 'Se hizo tal cosa',
                taskId: 2,
              }
            ],
          }
        ],
        topic: 'Este debe ser un Topic muy largo para que se pueda visualizar el correcto funcionamiento de la aplicación, incluso teniendo dos o tres lineas mas',
      },
      {
        id: 2,
        meetingId: 1, 
        tasks: [
          {
            assigned: 'Claudio Zurita',
            date: '18/05/2019',
            dueDate: Date,
            id: 1,
            status: 3,
            task: 'Visitar todos los pendientes. Es solo un ejemplo :P',
            topicId: 1,
            track: [
              {
                date: '18/06/2019',
                id: 1,
                info: 'Se hizo tal cosa',
                taskId: 1,
              }
            ],
          }
        ],
        topic: 'Este es otro tema a tratar :)',
      }
    ],
    place: 'Capilla Nueva Cordoba',
    users: 'Claudio Zurita, Benja, Yao',
  }
]