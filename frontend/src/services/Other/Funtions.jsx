const Logout = () => {
  localStorage.setItem("accessToken", "");

  window.location = "/";
};


const NavigateReg =() => {
  window.location.href = "http://localhost:3000/reg";
}
export { 
  Logout,
  NavigateReg
 };
