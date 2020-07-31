import React from "react";
import {
  HeaderNavigation,
  ALIGN,
  StyledNavigationList,
  StyledNavigationItem,
} from "baseui/header-navigation";
import { StyledLink } from "baseui/link";
import { Button, KIND, SHAPE } from "baseui/button";
import { Drawer } from "baseui/drawer";
import LoginForm from "../LoginForm";
import { useAuth } from "src/hooks/useAuth";
import DarkModeToggle from "src/components/atoms/DarkModeToggle";
import Logo from "src/components/atoms/Logo";
import ChangeLocaleButton from "@components/atoms/ChangeLocaleButton";
import AvatarButton from "@components/atoms/AvatarButton";
interface Props {}

const AppNavBar = (props: Props) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const auth = useAuth();
  const signOut = auth.signOut;
  return (
    <HeaderNavigation>
      <StyledNavigationList $align={ALIGN.left}>
        <StyledNavigationItem>
          <Logo />
        </StyledNavigationItem>
      </StyledNavigationList>
      <StyledNavigationList $align={ALIGN.center}>
        {/* <StyledNavigationItem>
          <Button onClick={() => alert("click")} disabled kind={KIND.minimal}>
            Shop
          </Button>
        </StyledNavigationItem>
        <StyledNavigationItem>
          <Button onClick={() => alert("click")} disabled kind={KIND.minimal}>
            Blog
          </Button>
        </StyledNavigationItem>
        <StyledNavigationItem>
          <Button onClick={() => alert("click")} disabled kind={KIND.minimal}>
            Ressources
          </Button>
        </StyledNavigationItem> */}
      </StyledNavigationList>
      <StyledNavigationList $align={ALIGN.right}>
        <StyledNavigationItem>
          <ChangeLocaleButton />
        </StyledNavigationItem>
        {auth.user ? (
          <StyledNavigationItem>
            <AvatarButton />
          </StyledNavigationItem>
        ) : (
          <>
            {/* <StyledNavigationItem>
              <DarkModeToggle />
            </StyledNavigationItem> */}
            <StyledNavigationItem>
              <Button shape={SHAPE.pill} onClick={() => setIsOpen(true)}>
                Get started
              </Button>
            </StyledNavigationItem>
          </>
        )}
      </StyledNavigationList>
      {auth.user ? (
        ""
      ) : (
        <Drawer isOpen={isOpen} autoFocus onClose={() => setIsOpen(false)}>
          <LoginForm onCompleted={() => setIsOpen(false)} />
        </Drawer>
      )}
    </HeaderNavigation>
  );
};

export default AppNavBar;
