import firebase from "firebase/app";
import { Axios } from "../../../../api/axios";
import { useHistory } from 'react-router-dom';
import { auth } from "../../../../Auth/firebase";

//--------------------------------------------------------
function RigisterForm() {
  const history = useHistory();
  //------------------------------------------------------
  const sendUser2Server = (token) => {
    if (token)
      Axios.post("/user/register", {}, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => {
          if (res) {
            console.log('saved user', res);
          }
          else {
            alert(res);
          }
        })
        .catch((err) => {
          console.log(err);
        });
  }


  //------Register by email password
  const authenticateUser = async (e) => {
    e.preventDefault();
    const email = e.target.querySelector("#email").value;
    const password = e.target.querySelector("#password").value;
    //const user = 
    await auth.createUserWithEmailAndPassword(email, password).then((data) => {
      return data.user.getIdToken();
    })
      .then((token) => {
        history.push('/');
        return sendUser2Server(token);
      })
      .catch((error) => {
        console.error(error);
      });
    //console.log(user.user);
  }
  //------Sign with google
  const signInWithGoogle = async () => {
    await auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((data) => {
      return data.user.getIdToken();
    })
      .then((token) => {
        history.push('/');
        return sendUser2Server(token);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  return (
    <>
      {/* <input type="email" name="email" id="email" className="focus:border-blue-500 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none" autoComplete="email" required />
      <input type="password" name="password" id="password" className="focus:border-blue-500 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none" autoComplete="current-password" required /> */}
      {/* <button type="submit" className="min-w-full align-middle bg-blue-500 hover:bg-blue-600 text-center px-4 py-2 text-white text-sm font-semibold rounded-lg inline-block shadow-lg">RIGISTER</button> */}
      {/* <button onClick={signInWithGoogle} className="mt-2 min-w-full align-middle bg-red-500 hover:bg-red-600 text-center px-4 py-2 text-white text-sm font-semibold rounded-lg inline-block shadow-lg">Sign with Google</button> */}

      {/* form rigister */}
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-gray-600 text-sm font-bold">
                    Sign in with
                      </h6>
                </div>
                <div className="btn-wrapper text-center">
                  <button
                    className="bg-white active:bg-gray-100 text-gray-800 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs"
                    type="button"
                    style={{ transition: "all .15s ease" }}
                  >
                    <img
                      alt="..."
                      className="w-5 mr-1"
                      src={require("./../../../../assets/img/github.svg")}
                    />
                        Github
                      </button>
                  <button
                    className="bg-white active:bg-gray-100 text-gray-800 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs"
                    type="button"
                    style={{ transition: "all .15s ease" }}
                  >
                    <img
                      alt="..."
                      className="w-5 mr-1"
                      src={require("./../../../../assets/img/google.svg")}
                    />
                        Google
                      </button>
                </div>
                <hr className="mt-6 border-b-1 border-gray-400" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="text-gray-500 text-center mb-3 font-bold">
                  <small>Or sign in with credentials</small>
                </div>
                <form>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Email
                        </label>
                    <input
                      type="email"
                      className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                      placeholder="Email"
                      style={{ transition: "all .15s ease" }}
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Password
                        </label>
                    <input
                      type="password"
                      className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                      placeholder="Password"
                      style={{ transition: "all .15s ease" }}
                    />
                  </div>
                  <div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        id="customCheckLogin"
                        type="checkbox"
                        className="form-checkbox text-gray-800 ml-1 w-5 h-5"
                        style={{ transition: "all .15s ease" }}
                      />
                      <span className="ml-2 text-sm font-semibold text-gray-700">
                        Remember me
                          </span>
                    </label>
                  </div>

                  <div className="text-center mt-6">
                    <button
                      className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                      type="button"
                      style={{ transition: "all .15s ease" }}
                    >
                      Sign In
                        </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="flex flex-wrap mt-6">
              <div className="w-1/2">
                <a
                  href="#pablo"
                  onClick={e => e.preventDefault()}
                  className="text-gray-300"
                >
                  <small>Forgot password?</small>
                </a>
              </div>
              <div className="w-1/2 text-right">
                <a
                  href="#pablo"
                  onClick={e => e.preventDefault()}
                  className="text-gray-300"
                >
                  <small>Create new account</small>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RigisterForm;
