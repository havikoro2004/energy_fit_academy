import './styles/app.scss';
import { Tooltip, Toast, Popover } from 'bootstrap';
import './bootstrap';
import axios from 'axios';

// Remove resend forms after refresh page script
if ( window.history.replaceState ) {
    window.history.replaceState( null, null, window.location.href );
}
//Clear les formulaire quand on click sur precedent ou suivant sur le navigateur
window.onpageshow = function(event) {
    if (event.persisted || performance.getEntriesByType("navigation")[0].type === 'back_forward') {
        location.reload();
    }
};
const cardClient = document.getElementById('clientCard')
if (cardClient){
    for (let i = 0 ; i < cardClient.children.length ; i++){
        const switchBtn = cardClient.children[i].getElementsByClassName('form-check-input')
        const modalBtn = cardClient.children[i].getElementsByClassName('modal-footer')
        const modalBody = cardClient.children[i].getElementsByClassName('modal-body')
        const validBtn = modalBtn[0].children[1];
        switchBtn[0].addEventListener('click',(e)=>{
            e.preventDefault()
            validBtn.addEventListener('click',()=>{
                modalBody[0].innerHTML ="<div class=\"spinner-border text-primary\" role=\"status\">\n" +
                    "</div>"
                axios.post('/client/'+validBtn.id+'/active', {
                })
                    .then(function (response) {
                        console.log(response);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                location.reload();

            })
        })
    }
}
const pageOneInput = document.getElementById('activBtnOnePage')
if (pageOneInput){
    const btnActiveOnePage = pageOneInput.children[0]
    const modalBtn = pageOneInput.getElementsByClassName('modal-footer')[0].children[1]
    const modalOnePageBody =  pageOneInput.getElementsByClassName('modal-body')
    btnActiveOnePage.addEventListener('click',(e)=>{
        e.preventDefault()
        modalBtn.addEventListener('click',()=>{
            modalOnePageBody[0].innerHTML ="<div class=\"spinner-border text-primary\" role=\"status\">\n" +
                "</div>"
            axios.post('/client/'+modalBtn.id+'/active', {
            })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
            location.reload();
        })
    })
}
if (document.getElementById('permissionCollaps')){
    const permissionCollaps = document.getElementById('permissionCollaps')
    const switchesBtns = permissionCollaps.getElementsByClassName('form-check-input')
    const permissionModal = document.getElementById('permissionsModal')
    const editPermissionBtn = permissionModal.getElementsByClassName('modal-footer')[0].children[1]
    const modalPermissionBody = permissionModal.getElementsByClassName('modal-body')[0]
    for (let i = 0 ; i < switchesBtns.length ; i++){
        switchesBtns[i].addEventListener('click',(e)=>{
            e.preventDefault()
            editPermissionBtn.addEventListener('click',()=>{
                modalPermissionBody.innerHTML="<div class=\"spinner-border text-primary text-center\" role=\"status\">\n" +
                    "</div>"
                axios.post('/permission/edit/'+ switchesBtns[i].name, {
                    inputName: switchesBtns[i].value,
                })
                    .then(function (response) {
                        console.log(response);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                location.reload();
            })
        })
    }
}
if (document.getElementById('branchCard')){
    const activeBranchModal = document.getElementById('branchCard')
    for (let i=0 ; i< activeBranchModal.children.length ; i++){

       const activeBtn = activeBranchModal.children[i].getElementsByClassName('activeBranch')
            activeBtn[0].addEventListener('click',(e)=>{
                e.preventDefault()
                const footer = activeBranchModal.children[i].getElementsByClassName('modal-footer')[0].children[1]
                const body = activeBranchModal.children[i].getElementsByClassName('modal-body')[0]
                footer.addEventListener('click',()=>{
                    body.innerHTML="<div class=\"spinner-border text-primary text-center\" role=\"status\">\n" +
                        "</div>"
                    axios.post('/branch/'+ activeBtn[0].name+'/edit', {
                    })
                        .then(function (response) {
                            console.log(response);
                            document.body.scrollTop = document.documentElement.scrollTop = 0;
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                    location.reload();
                })
            })
    }

}

if(document.getElementById('branchCard')){
    const branchCard = document.getElementById('branchCard')
    for (let i=0;i<branchCard.children.length;i++){
        const cards = branchCard.children[i].getElementsByClassName('editPermissionsBranch')[0].getElementsByClassName('form-check-input')
        for (let j=0;j<cards.length;j++){
            cards[j].addEventListener('click',(e)=>{
                e.preventDefault()
                const modal = document.getElementById('editBranchPermissions')
                const footer = modal.getElementsByClassName('modal-footer')[0].children[1]
                const idClient = branchCard.getAttribute('class');
                const body = modal.getElementsByClassName('modal-body')[0]
                const idBranch = cards[j].name
                footer.addEventListener('click',()=>{
                    body.innerHTML="<div class=\"spinner-border text-primary text-center\" role=\"status\">\n" +
                        "</div>"
                    axios.post('/permission/'+idClient+'/'+idBranch+'/edit', {
                        inputName: cards[j].value,
                    })
                        .then(function (response) {
                            console.log(response);
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                    location.reload();
                })
            })
        }
    }
}

if (document.getElementById('modifClient')){
    const sectionPartenaireEdit = document.getElementById('modifClient')
    sectionPartenaireEdit.getElementsByTagName('form')[0].children[6].children[1].readOnly=true
}

if (document.getElementById('editBranch')){
    const sectionBranchEdit =document.getElementById('editBranch')
    sectionBranchEdit.getElementsByTagName('form')[0].children[2].readOnly=true
}

if (document.getElementById('errorsNewPassword')){
    const errorsNewPassword = document.getElementById('errorsNewPassword')
    errorsNewPassword.getElementsByTagName('ul')[0].setAttribute('class','list-unstyled m-0 p-0')
}

if (document.getElementById('actifs')){
    var actifs = document.getElementById('actifs')
    actifs.addEventListener('click',()=>{
        actifs.value = 1
        inactifs.value=0
        tous.value=0
        axios.get('/find_actifs', {
            headers : {
                'X-Requested-With' : 'XMLHttpRequest'
            }
        })
            .then(function (response) {
                document.getElementById('ajaxContent').innerHTML=response.data.ajaxContent
                document.getElementById('paginator').innerHTML=response.data.paginator
            })
    })
}
if (document.getElementById('inactifs')){
    var inactifs = document.getElementById('inactifs')
    inactifs.addEventListener('click',()=>{
        actifs.value = 0
        inactifs.value=1
        tous.value=0
        axios.get('/find_inactif', {
            headers : {
                'X-Requested-With' : 'XMLHttpRequest'
            }
        })
            .then(function (response) {
                document.getElementById('ajaxContent').innerHTML=response.data.ajaxContent
                document.getElementById('paginator').innerHTML=response.data.paginator
            })
    })
}
if (document.getElementById('tous')){
    var tous = document.getElementById('tous')
    tous.addEventListener('click',()=>{
        actifs.value = 0
        inactifs.value=0
        tous.value=1
        axios.get('/', {
            headers : {
                'X-Requested-With' : 'XMLHttpRequest'
            }
        })
            .then(function (response) {
                document.getElementById('ajaxContent').innerHTML=response.data.ajaxContent
                document.getElementById('paginator').innerHTML=response.data.paginator
            })
    })
}
if (document.getElementById('recherche')){
    const recherche = document.getElementById('recherche')
    recherche.addEventListener('keyup',()=>{
        var filterStatus = null
        if (actifs.value==1){
            filterStatus='actifs'
        } else if (inactifs.value==1){
            filterStatus='inactifs'
        } else {
            filterStatus='tous'
        }
        const text = recherche.value
        axios.post('/client_letter', {
            letter: text,
            filterStatus:filterStatus
        })
            .then(function (response) {
                document.getElementById('ajaxContent').innerHTML=response.data.ajaxContent
                document.getElementById('paginator').innerHTML=''
                if (document.getElementsByClassName('imgActiveBtn').length == 0 ){
                    document.getElementById('ajaxContent').innerHTML='<div class="mt-3 container text-center alert alert-danger">Aucun partenaire trouvé avec ce mot clé saisi</div>'
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    })
}

if (document.getElementById('branchActifs')){
    var branchActifs = document.getElementById('branchActifs')
    branchActifs.addEventListener('click',()=>{
        axios.post('/branch_actifs', {
            idClient: branchActifs.name,
        })
            .then(function (response) {
                document.getElementById('branchCard').innerHTML=response.data.branchCard
            })
            .catch(function (error) {
                console.log(error);
            });
    })
}
if (document.getElementById('branchInactifs')){
    var branchInactifs = document.getElementById('branchInactifs')
    branchInactifs.addEventListener('click',()=>{
        axios.post('/branch_inactifs', {
            idClient: branchInactifs.name,
        })
            .then(function (response) {
                document.getElementById('branchCard').innerHTML=response.data.branchCard
            })
            .catch(function (error) {
                console.log(error);
            });
    })
}
if (document.getElementById('branchTous')){
    var branchTous = document.getElementById('branchTous')
    branchTous.addEventListener('click',()=>{
        axios.post('/branch_tous', {
            idClient: branchTous.name,
        })
            .then(function (response) {
                document.getElementById('branchCard').innerHTML=response.data.branchCard
            })
            .catch(function (error) {
                console.log(error);
            });
    })
}