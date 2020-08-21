import React from "react";

interface Props {}
import Router from "next/router";
import { setAuthToken } from "@utils/auth";
import LoadingScreen from "@components/molecules/LoadingScreen";
import { useAuth } from "@hooks/useAuth";
import { ParagraphLarge } from "baseui/typography";
import BackHomeNavBar from "@components/molecules/BackHomeNavBar /BackHomeNavBar ";
import { toaster } from "baseui/toast";

const AuthCallbackPage = (props: Props) => {
  const [text, setText] = React.useState("Loading...");
  const { access_token, provider } = Router.query;
  const [loading, setSetloading] = React.useState(true);

  const auth = useAuth();
  function fetchUser() {}
  React.useEffect(() => {
    // Successfully logged with the provider
    // Now logging with strapi by using the access_token (given by the provider) in props.location.search
    fetch(
      `${process.env.NEXT_PUBLIC_API_URI}/auth/${provider}/callback?access_token=${access_token}`
    )
      .then((res) => {
        if (res.status !== 200) {
          throw new Error(`Couldn't login to Beeesy. Status: ${res.status}`);
        }
        return res;
      })
      .then((res) => res.json())
      .then((res) => {
        localStorage.setItem("token", res.jwt);
        auth.getUser();
        toaster.info("You are successfully logged in", {});
        Router.push("/");
      })
      .catch((err) => {
        setSetloading(false);
        console.log(err);
        setText("An error occured.");
      });
  }, [provider]);
  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          <BackHomeNavBar />
          <ParagraphLarge>{text}</ParagraphLarge>
        </>
      )}
    </>
  );
};

export default AuthCallbackPage;
