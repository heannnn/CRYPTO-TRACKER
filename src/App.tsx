import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import Router from "./Router";
import { ReactQueryDevtools } from "react-query/devtools";
import { DarkTheme, LightTheme } from "./theme";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "./atoms";

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');
  html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
  line-height: 1;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
body{
  font-family: 'Source Sans Pro', sans-serif;
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
}
*{
  box-sizing: border-box;
}
a{
  text-decoration: none;
  color:inherit;
}
`;

const Button = styled.button`
  background-color: ${(props) => props.theme.bgColor};
  border: none;
  color: ${(props) => props.theme.accentColor};
  font-size: medium;
  padding: 10px 10px;
  cursor: pointer;
  float: right;
`;

function App() {
  const isDark = useRecoilValue(isDarkAtom);
  return (
    <>
      <ThemeProvider theme={isDark ? DarkTheme : LightTheme}>
        <GlobalStyle />
        <Router />
        <ReactQueryDevtools initialIsOpen={true} />
      </ThemeProvider>
    </>
  );
}

export default App;

// 현재는 Theme 정보를 전달하기 위해 많은 단계를 거침
// App(isDark, modifierFn)
// => Router => Coins (modifierFn)
// => Router => Coin => Chart (isDark)
// EX) 많은 컴포넌트에서 로그인 유무에 대한 정보를 알고싶을때
// => state management가 필요함 (Recoil)
// state management 이용) 부모가 자식에게 props를 내려주는 계층 구조 대신
// state를 따로 bubble(Atom)에 담아 각 컴포넌트가 필요할 때 bubble에 접근해서 사용할 수 있게 함
