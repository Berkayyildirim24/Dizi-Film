const signUpButton=document.getElementById('signUpButton');
const signInButton=document.getElementById('signInButton');
const signInForm=document.getElementById('signIn');
const signUpForm=document.getElementById('signup');

signUpButton.addEventListener('click',function(){
    signInForm.style.display="none";
    signUpForm.style.display="block";
})
signInButton.addEventListener('click', function(){
    signInForm.style.display="block";
    signUpForm.style.display="none";
})

// script.js içerisine ekleyin veya mevcut kodu değiştirin

const saveButton = document.querySelectorAll('.move-button');

saveButton.forEach(button => {
    button.addEventListener('click', function() {
        const user = auth.currentUser;
        if (user) {
            const diziId = this.getAttribute('data-dizi-id'); // dizinin ID'sini alın
            const diziTitle = this.parentElement.querySelector('.card-title').textContent;
            const diziImage = this.parentElement.querySelector('img').src;

            const diziData = {
                id: diziId,
                title: diziTitle,
                image: diziImage
            };

            const userDocRef = doc(db, "users", user.uid, "savedDiziler", diziId);
            setDoc(userDocRef, diziData)
                .then(() => {
                    alert('Dizi başarıyla kaydedildi!');
                })
                .catch(error => {
                    console.error("Error saving document: ", error);
                });
        } else {
            alert("Lütfen giriş yapın.");
        }
    });
});
