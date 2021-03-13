import firebase from "firebase";
//--------------------------------------------------------
function LoginForm({ auth }) {
  async function authenticateUser(e) {
    e.preventDefault();
    const email = e.target.querySelector("#email").value;
    const password = e.target.querySelector("#password").value;
    try {
      const user = await auth.signInWithEmailAndPassword(email, password);
      console.log(user);
    } catch (err) {
      console.log(err);
    }
  }
  const googleProvider = new firebase.auth.GoogleAuthProvider()
  const signInWithGoogle = () => {
    auth.signInWithPopup(googleProvider).then((res) => {
      console.log(res.user)
    }).catch((error) => {
      console.log(error.message)
    })
  }
  return (
    <>
      {/* form login */}
      <div className="max-w-md mx-auto">
        <div className="flex justify-center block lg:flex bg-white lg:shadow-lg rounded-lg">
          <div className="w-full px-6 py-16">
            <div className="mb-4 font-light tracking-widest text-2xl">LOGIN</div>
            <form onSubmit={authenticateUser}>
              <div className="mb-4">
                <label htmlFor="email" className="block mb-2 text-sm text-gray-800">Email</label>
                <input type="email" name="email" id="email" className="focus:border-blue-500 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none" autoComplete="email" required />
                <div v-if="feedback.email.error">
                  <div className="text-sm text-red-500 mt-2" v-text="feedback.email.message" />
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block mb-2 text-sm text-gray-800">Your password</label>
                <input type="password" name="password" id="password" className="focus:border-blue-500 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none" autoComplete="current-password" required />
              </div>
              {/* <label className="mb-4 flex items-center">
            <input type="checkbox" className="form-checkbox" name="remeber" id="remeber" defaultChecked />
            <span className="ml-2">I want to remember you ?</span>
          </label> */}
              <div className="block md:flex items-center justify-center">
                <button type="submit" className="min-w-full align-middle bg-blue-500 hover:bg-blue-600 text-center px-4 py-2 text-white text-sm font-semibold rounded-lg inline-block shadow-lg">LOGIN</button>
                {/* <a className="text-gray-600 hover:text-gray-700 no-underline block mt-3" href="/password/reset">
              Forgot Your Password?
            </a> */}
              </div>
              <button onClick={signInWithGoogle} className="mt-2 min-w-full align-middle bg-red-500 hover:bg-blue-600 text-center px-4 py-2 text-white text-sm font-semibold rounded-lg inline-block shadow-lg">Login with Google</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginForm;
