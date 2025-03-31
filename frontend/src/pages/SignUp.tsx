import DATA from "@/constants/signUp";
import { NavLink } from "react-router";
import { Link } from "react-router";

const SignUp = () => {
  return (
    <section className="grid grid-cols-2 grid-rows-1 m-4">
      <figure className="h-full w-full">
        <img
          className="object-cover h-full w-full rounded-[1.5rem]"
          src="https://img.freepik.com/free-vector/posts-concept-illustration_114360-204.jpg?t=st=1743457267~exp=1743460867~hmac=c7543514273f7c94f342efb54c7df07c458ea94e2ffce029a8867d4a108ebb3c&w=1380"
        />
      </figure>
      <section className="p-20">
        <h1 className="text-2xl mb-4 text-base-content">{DATA.TITLE}</h1>
        <p className="mb-4">
          {DATA.LOGIN_LINK_PREV}
          <Link to={"/"} className="underline">
            {DATA.LOGIN_LINK}
          </Link>
        </p>
        <form className="grid space-y-4">
          <div className="grid gap-2 grid-cols-2">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">{DATA.USERNAME}</legend>
              <label className="input validator">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </g>
                </svg>
                <input type="text" placeholder={DATA.USERNAME_PLACEHOLDER} />
              </label>
              <p className="fieldset-label">Optional</p>
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">{DATA.EMAIL}</legend>
              <input
                type="text"
                className="input"
                placeholder={DATA.EMAIL_PLACEHOLDER}
              />
              <p className="fieldset-label">Optional</p>
            </fieldset>
          </div>
          <div className="grid gap-2 grid-cols-2">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">{DATA.FIRST_NAME}</legend>
              <input
                type="text"
                className="input"
                placeholder={DATA.FIRST_NAME_PLACEHOLDER}
              />
              <p className="fieldset-label">Optional</p>
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">{DATA.LAST_NAME}</legend>
              <input
                type="text"
                className="input"
                placeholder={DATA.LAST_NAME_PLACEHOLDER}
              />
              <p className="fieldset-label">Optional</p>
            </fieldset>
          </div>
          <div className="grid gap-2 grid-cols-2">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">{DATA.PASSWORD}</legend>
              <input
                type="text"
                className="input"
                placeholder={DATA.PASSWORD_PLACEHOLDER}
              />
              <p className="fieldset-label">Optional</p>
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">
                {DATA.CONFIRM_PASSWORD}
              </legend>
              <input
                type="text"
                className="input"
                placeholder={DATA.PASSWORD_PLACEHOLDER}
              />
              <p className="fieldset-label">Optional</p>
            </fieldset>
          </div>
          <div className="flex gap-4">
            <input
              id="checkbox"
              type="checkbox"
              defaultChecked
              className="checkbox checkbox-primary"
            />
            <label htmlFor="checkbox" className="hover:cursor-pointer">
              {DATA.CHECK_AGREE}
              <NavLink
                to={"https://www.google.com"}
                className={"underline"}
                target="_blank"
              >
                {DATA.TERMS_CONDITION}
              </NavLink>
            </label>
          </div>
          <button className="btn btn-primary">{DATA.CREATE_BTN}</button>
        </form>
      </section>
    </section>
  );
};
export default SignUp;
