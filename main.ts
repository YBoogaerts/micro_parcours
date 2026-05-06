namespace Parcours{
   type Action = (userPos:number, serialNumber:number, message: string)=> void;
   let user: string[] = [] 
   let userId: number[] = [] 
   let userState: number[] = []
   let stateAction: Action[] = []

    //% block="Action à l'étape $etape"
    export function setAction(pos : number, action : Action){
        stateAction[pos] = action
    }

    radio.onReceivedString(function (receivedString: string) {
        let serial = radio.receivedPacket(RadioPacketProperty.SerialNumber)
        let pos = userId.indexOf(serial )
        let state = 0;
        if( pos >= 0 ){
            state = userState[pos];
        }

        // On vérifie si un handler existe pour l'état actuel
        if (stateAction[pos]) {
            // On exécute le handler en lui passant les données "capturées"
            stateAction[pos](pos, serial, receivedString)
        }
    })
    //% block="inscrire $nom avec le numéro $id"
    export function inscription(nom: string, id: number) {
        let pos = userId.indexOf(id)
        if (pos < 0) {
            user.push(nom)
            userId.push(id)
            userState.push(0)
        } else {
            user[pos] = nom
        }
    }

    //% block="étape suivante pour $id"
    export function nextState(id: number) {
        let pos2 = userId.indexOf(id)
        if (pos2 >= 0) {
            userState[pos2]++
        }
    }

    //% block="affiche les joueurs en console"
    export function printUser() {
        for (let i = 0; i < userId.length ; i++) {
            console.log(`${i} [${userId[i]}]: ${user[i]} -> étape: ${userState[i]}`);
        }
    }
    }
