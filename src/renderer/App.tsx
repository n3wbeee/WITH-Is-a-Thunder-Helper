import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import close from '../../assets/icons/close.svg';
import maximize from '../../assets/icons/maximize.svg';
import minimize from '../../assets/icons/minimize.svg';
import './AppComplied.css';

function Sidebar() {
	const [activeButton, setActiveButton] = useState('test');

	function Button({
		text,
		activeButton,
		onClick,
	}: {
		text: string;
		activeButton: string;
		onClick?: () => void;
	}) {
		return (
			<div
				className={`w-full h-12 rounded-xl select-none flex items-center p-4 transition-colors cursor-pointer
				${activeButton === text ? 'bg-blue-500 text-neutral-100' : 'hover:bg-blue-400 hover:text-neutral-100'}
				active:bg-blue-600
				`}
				onClick={onClick}
				id={text}
			>
				{text}
			</div>
		);
	}

	return (
		<div className="w-48 h-full bg-neutral-50 flex flex-col items-center p-4 gap-4">
			<Button
				text="test"
				activeButton={activeButton}
				onClick={() => setActiveButton('test')}
			/>
			<Button
				text="test2"
				activeButton={activeButton}
				onClick={() => setActiveButton('test2')}
			/>
		</div>
	);
}

function Navbar() {
	return (
		<div
			className="h-8 bg-neutral-50 flex flex-row justify-end items-center"
			// 窗口拖拽
			style={{ WebkitAppRegion: 'drag' } as any}
		>
			<div
				className="w-12 h-8 flex justify-center items-center hover:bg-neutral-200 cursor-pointer"
				style={{ WebkitAppRegion: 'no-drag' } as any}
				onClick={window.electron.minimizeApp}
			>
				<img src={minimize} />
			</div>
			<div
				className="w-12 h-8 flex justify-center items-center hover:bg-neutral-200 cursor-pointer"
				style={{ WebkitAppRegion: 'no-drag' } as any}
				onClick={window.electron.maximizeApp}
			>
				<img src={maximize} />
			</div>
			<div
				className="w-12 h-8 flex justify-center items-center hover:bg-red-400 cursor-pointer"
				style={{ WebkitAppRegion: 'no-drag' } as any}
				onClick={window.electron.closeApp}
			>
				<img src={close} />
			</div>
		</div>
	);
}

function MainPage() {
	return (
		<>
			<Sidebar />
			<div className="bg-neutral-200 w-px h-full" />
			{/* 左侧主页面 */}
			<div className="flex flex-col flex-1 justify-start bg-neutral-100">
				<Navbar />
				<div className="bg-neutral-200 w-full h-px" />

				{/* 内容区 */}
			</div>
		</>
	);
}

export default function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<MainPage />} />
			</Routes>
		</Router>
	);
}
