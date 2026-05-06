namespace Parcours{
   let user: string[] = [] 
   let userId: number[] = [] 
   let userState: number[]=[]

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
        let pos = userId.indexOf(id)
        if (pos < 0) {
            userState[pos]++
        }
    }

    //% block="affiche les joueurs en console"
    export function printUser() {
        for (let i = 0; i < userId.length ; i++) {
            console.log(`${i} [${userId[i]}]: ${user[i]} -> étape: ${userState[i]}`);
        }
    }
    }
   
