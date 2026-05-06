namespace Parcours{
   let user: string[] = [] 
   let idUser: number[] = [] 
    
    //% block="inscrire $nom avec le numéro $id"
    export function inscription(nom: string, id: number) {
        let pos = idUser.indexOf(id)
        if (pos < 0) {
            user.push(nom)
            idUser.push(id) 
        } else {
            user[pos]= nom
        }
    }
    
    //% bolck="affiche les joueurs en console"
    export function printUser() {
        for (let i = 0; i < idUser.length ; i++) {
            console.log(`${i} [${idUser[i]}]: ${user[i]}`);
        }
    }
    }
   
