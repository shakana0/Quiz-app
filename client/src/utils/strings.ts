const Strings = {
    landingPage: {
        pageHader: "Have fun learning",
        text: {
            createQuiz: "Make your own quizes. Customize quiz with flashcards on repeat,shuffle, etc.",
            inviteFriends: "Invite friends and take quizes together.",
            callFriends: "Give your friends a call and practice together live."
        },
        button: {
            getStarted: "Get started"
        }
    },
    home: {
        pageHader: "Home",
        recent: "Recent"
    },
    authModal: {
        text: {
            orEmail: "Or Email"
        }
    },
    createQuizPage: {
        pageHader: "Create a new quiz",
        text: {
            error: "You need to have at least two cards, a term and definition to create quiz.",
        },
        buttons: {
            upload: "Upload Image",
            getImg: "Get Image",
            add: "Add Another Card"
        }
    },
    singleQuiz: {
        back: "Back",
        completedQuizMsg: {
            bad: { emoji: "\u{1F972}", msg: "You need to practise more." },
            ok: { emoji: "\u{1F60A}", msg: "Good Job!" },
            good: { emoji: "\u{1F973}", msg: "You did an amazing job!!!" },
        },
        text: {
            choose: "Choose mathcing term",
            youGot: "You got ",
            termsRight: " terms right",
            pick: "Pick a study mode!"
        },

        wrong: {
            wrongEmoji: "\u{1F621}",
            wrong: "Wrong!"
        },
        buttons: {
            next: "Next",
            back: "Back",
            answer: "Answer",
            continue: "Continue"
        },
        quizNames: {
            flashCards: "Flashcards",
            write: "Write",
            match: "Match"
        },
        flashCards: {
            compleeted: "You have compleeted ",
            terms: " terms"
        }
    },
    quizList: {
        text: {
            empty: "You don't have any quizes yet"
        }
    },
    globalButtons: {
        button: {
            authLogOut: "Log Out",
            fbLogOut: "fb Log Out",
            googleLogout: "g Log out",
            authLogIn: "Log In",
            fbLogIn: "Log In With Facebook",
            googleLogIn: "Log In With Google",
            signUp: "Sign Up", 
            create: 'Create'
        }
    },
    confirmationDialog:{
        text:{
            confirmation: "Are you sure you want to delete this quiz?",
            yes: "Yes",
            no: "No"
        }
    },
    ImageSearch:{
        text:{
            error: "Sorry, no images found \u{1F623}"
        }
    },
    ImageUpload:{
        text:{
            lableText: "You can drag and drop image",
            error: "File type not supported. Only images can be uploaded"
        }
    }
}

export default Strings