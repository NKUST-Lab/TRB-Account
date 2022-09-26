
import firebase from 'firebase/compat/app';
import * as firebaseui from 'firebaseui';
// FirebaseUI config.
const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // signInSuccessUrl: '/Profile',
    signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        "apple.com",
        firebase.auth.PhoneAuthProvider.PROVIDER_ID,
        firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
    ],
    // tosUrl and privacyPolicyUrl accept either url string or a callback
    // function.
    // Terms of service url/callback.
    tosUrl: '<your-tos-url>',
    // Privacy policy url/callback.
    privacyPolicyUrl: function() {
        window.location.assign('<your-privacy-policy-url>');
    }
};

export default uiConfig;