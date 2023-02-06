import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { Header } from "./components/header/Header";

const Main = styled.div`
	width: 1110px;
	margin: 0 auto;
`;

function App() {
	return (
		<Main>
			<Header />
			{/* any component */}
			<Outlet />
		</Main>
	);
}

export default App;
