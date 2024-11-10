class OverworldEvent {
    constructor({ map, event}) {
      this.map = map;
      this.event = event;
    }
  
    stand(resolve) {
      const who = this.map.gameObjects[ this.event.who ];
      who.startBehavior({
        map: this.map
      }, {
        type: "stand",
        direction: this.event.direction,
        time: this.event.time
      })
      
      //Set up a handler to complete when correct person is done walking, then resolve the event
      const completeHandler = e => {
        if (e.detail.whoId === this.event.who) {
          document.removeEventListener("PersonStandComplete", completeHandler);
          resolve();
        }
      }
      document.addEventListener("PersonStandComplete", completeHandler)
    }
  
    walk(resolve) {
      const who = this.map.gameObjects[ this.event.who ];
      who.startBehavior({
        map: this.map
      }, {
        type: "walk",
        direction: this.event.direction,
        retry: true
      })
  
      //Set up a handler to complete when correct person is done walking, then resolve the event
      const completeHandler = e => {
        if (e.detail.whoId === this.event.who) {
          document.removeEventListener("PersonWalkingComplete", completeHandler);
          resolve();
        }
      }
      document.addEventListener("PersonWalkingComplete", completeHandler)
  
    }

    textMessage(resolve) {
      if (this.event.facePlayer) {
        const obj = this.map.gameObjects[this.event.facePlayer];
        obj.direction = utils.towardsPlayer(this.map.gameObjects.player, obj)
      }
      const message = new TextMessage({
        text: this.event.text,
        onComplete: () => resolve()
      })
      message.init( document.querySelector(".game-container") )
    }

    dragDropQuiz(resolve) {
      if (this.event.facePlayer) {
        const obj = this.map.gameObjects[this.event.facePlayer];
        obj.direction = utils.towardsPlayer(this.map.gameObjects.player, obj)
      }
      const quiz = new DragDropQuiz({
        text: this.event.text,
        onComplete: () => resolve()
      })
      quiz.init( document.querySelector(".game-container") )
    }
  
    init() {
      return new Promise(resolve => {
        this[this.event.type](resolve)      
      })
    }
  
  }