namespace Parcours{
   type Action = (userId:number, serialNumber:number, message: string)=> void;
   let userList: string[] = [] 
   let userIdList: number[] = [] 
   let userStateList: number[] = []
   let stateActionList: Action[] = []

    /**
     * Définit l'action à exécuter pour une étape précise
     * @param userId le numéro de l'utilisateur
     * @param action le code à exécuter
     */
    //% block="Action à l'étape $userId"
    //% handlerStatement=1
    //% draggableParameters="reporter"
    export function setAction(userId: number, action: (userId: number, serialNumber: number, message: string) => void) {
        stateActionList[userId] = action
        //console.log(action)
    }
    radio.onReceivedString(function (receivedString: string) {
        // id de l'émetteur
        let serial = radio.receivedPacket(RadioPacketProperty.SerialNumber)
        // numéro d'utilisateur
        let userId = userIdList.indexOf(serial )
        // calcul de l'étape de l'utilisateur
        let state = 0;
        // console.log(receivedString)
        if (userId >= 0 ){
            state = userStateList[userId];
        }

        // On vérifie si un handler existe pour l'état actuel
        if (stateActionList[userId]) {
            // On exécute le handler en lui passant les données "capturées"
            stateActionList[userId](userId, serial, receivedString)
        }
    })
    //% block="inscrire $nom avec le numéro $id"
    export function inscription(nom: string, id: number) {
        let userId2 = userIdList.indexOf(id)
        if (userId2 < 0) {
            userList.push(nom)
            userIdList.push(id)
            userStateList.push(0)
        } else {
            userList[userId2] = nom
        }
    }

    //% block="étape suivante pour $userId"
    export function nextState(userId: number) {
        userStateList[userId]++
    }

    //% block="affiche les joueurs en console"
    export function printUser() {
        for (let i = 0; i < userIdList.length ; i++) {
            serial.writeLine(`${i} [${userIdList[i]}]: ${userList[i]} -> étape: ${userStateList[i]}`);
        }
    }
    }
