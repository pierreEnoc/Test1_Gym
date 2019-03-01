( function(){
    const search = document.getElementById("search");
    const profile = document.getElementById("profile");
    const url ="https://api.github.com/users";
    const client_id = "e54c26adf70681f4e8e0";
    const client_secret ="7df70004baf71fe3e8d4d0b9fbcb1507e5e24762";
    const count = 50;
    const sort ="created: asc"
    
    
    async function getUser(user){
        const profileResponse = await fetch(
        `${url}/${user}?client_id=${client_id}&client_secret=${client_secret}`
        );
    
     const reposResponse = await fetch(
            `${url}/${user}/repos?per_page=${count}&sort=${sort}client_id=${client_id}&client_secret=${client_secret}`
            );
            const commitsResponse = await fetch(
                `${url}/${user}/commits?per_page=2?order=desc=${count}&sort=${sort}client_id=${client_id}&client_secret=${client_secret}`
                );
        
    const profile = await profileResponse.json();
    const repos = await reposResponse.json();
    
       return {profile,repos,};
    }
    
    function showProfile(user){
        profile.innerHTML =`<div class="row mt-3"> 
        <div class="col-md-4">
        <div class="card" style="width:18rem;">
        <img class="card-img.top" src="${user.avatar_url}" />
        <ul class="List-group List-group-flush">
         <li class="List-grou-item">Repositorios: <span class="badge badge-success">${user.public_repos}</span></li>   
         <li class="List-grou-item">Seguidores:<span class="badge badge-primary">${user.followers}</span></li> 
         <li class="List-grou-item">Seguindo<span class="badge badge-info">${user.following}</span></li> 
        </ul>
        <div class="card-body">
         <a href="${user.html_url}" target="_blank" class="btn btn-warning btn-block"> ver perfil</a>
     </div>
    </div>
    </div>
    <div class="col-md-8">
    <div id="repos"></div>
    <div id="commits"></div>
    </div>
    </div>`;
    }
    
    function showRepos (repos){
    let output="";
    
    repos.forEach(repo => {
        output += `<div class="card card-body-mb-2">
            <div class="row">
            <div class="col-md-6"><a href="${repo.html_url}" target="_black">${repo.name}</a></div>
            <div class="col-md-6">
            <span class="badge badge-success">starts: ${repo.stargazers_count}</span>
            <span class="badge badge-primary">Watch: ${repo.watchers_count}</span>
            <span class="badge badge-warning">Forks: ${repo.forks_count}</span>   
            </div>
            </div>
        </div>`;
    });

    function showCommits (commit){
        let output="";
        
        commits.forEach(commit => {
            output += `<div class="card card-body-mb-2">
                <div class="row">
                <div class="col-md-6"><a href="${commit.html_url}" target="_black">${commit.name}</a></div>
                <div class="col-md-6">
                <span class="badge badge-success">starts: ${commit.committer}</span>
                        
                </div>
                </div>
            </div>`;
        });
    }
    document.getElementById("repos").innerHTML = output;
    document.getElementById("commits").innerHTML = output;
    }
    
    search.addEventListener("keyup", e => {
        const user = e.target.value;
    
        if(user.length > 0) {
        getUser(user).then(res => {
            showProfile(res.profile);
            showRepos(res.repos);
            showCommits(res.commits);
        });
    }
    });
    })();