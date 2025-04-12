console.log("Hello my profile");

const avatarBox = document.getElementById("avatar-box");
const alertBox = document.getElementById("alert-box");
const profileForm = document.getElementById("profile-form");
const csrf = document.getElementsByName("csrfmiddlewaretoken");

const bioInput = document.getElementById("id_bio");
const avatarInput = document.getElementById("id_avatar"); 

profileForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("csrfmiddlewaretoken", csrf[0].value);
    formData.append("bio", bioInput.value);
    formData.append("avatar", avatarInput.files[0]);

    $.ajax({
        type: "POST",
        url: '',
        data: formData,
        enctype: "multipart/form-data",
        success: function (response) {
            console.log("Success:", response);
            avatarBox.innerHTML = `
            <img src="${response.avatar}" class="rounded" height="200" width="auto" alt="${response.user}">
            `;

            bioInput.value = response.bio;
            handleAlerts('success', 'Profile updated successfully!');
        },
        error: function (error) {
            console.error("Error:", error);
        },
        processData: false,
        contentType: false,
        cache: false,
    });

});