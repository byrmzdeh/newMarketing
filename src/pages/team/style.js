document.addEventListener('DOMContentLoaded', function(){
    const teamCards=document.getElementById('teamCards')
    const teamUrl='/src/data/team.json'
    fetch(teamUrl)
    .then(res=>res.json())
    .then(data=>{
        teamCards.innerHTML=data.map(item=>
            `
             <div class="teamCard">
            <img class='team' src="${item.img}" alt="err">
           <div class='teamAbout'>
            <p class='name'>${item.name}</p>
            <p>${item.category}</p>
            <div class="iconsTeam">
                <a href="${item.socials.instagram}" class="iconT"><img src="/src/assets/image/home/instagram.png"
                        alt="err"></a>
                <a href="${item.socials.linkedin}" class="iconT"><img src="/src/assets/image/home/in.png" alt="err"></a>
                <a href="${item.socials.facebook}" class="iconT"><img src="/src/assets/image/home/facebook.png"
                        alt="err"></a>
            </div>
           </div>

        </div>`
        ).join("");
        
        
    })

})