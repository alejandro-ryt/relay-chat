import SIGN_IN_DATA from "@/constants/signIn";

const SignIn = () => {
  return (
    <section className="grid bg-base-100 rounded-[1.5rem] grid-cols-1 xl:grid-cols-2 grid-rows-1 gap-2 m-4">
      <figure className="h-full w-full">
        <img
          className="object-cover h-full w-full rounded-[1.5rem]"
          src="https://img.freepik.com/free-vector/posts-concept-illustration_114360-204.jpg?t=st=1743457267~exp=1743460867~hmac=c7543514273f7c94f342efb54c7df07c458ea94e2ffce029a8867d4a108ebb3c&w=1380"
        />
      </figure>
      <section className="xl:p-20 p-8">
        <h1 className="text-3xl mb-4 text-primary">{SIGN_IN_DATA.TITLE}</h1>
      </section>
    </section>
  );
};
export default SignIn;
