import { useLayoutEffect, useRef, useState } from "react";
import useContextMenu from "../hooks/useContextMenu";
import { AiOutlineReload } from "react-icons/ai";
import { IoMdArrowForward, IoMdArrowBack } from "react-icons/io";
import { IoCopy, IoClose } from "react-icons/io5";
import { MdEdit, MdTab } from "react-icons/md";
import { HiPlus } from "react-icons/hi";
import { RiWindowFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

// deprecated component for custom right click menu
const ContextMenu = ({ contextFunctions }) => {
	// contextFunctions = contextFunctions.contextFunctions
	const navigate = useNavigate();
	const { xPos, yPos, showMenu, func } = useContextMenu(contextFunctions);
	const [style, setStyle] = useState({
		top: yPos,
		left: xPos,
	});
	const ref = useRef(null);
	let width = 0;
	let height = 0;
	useLayoutEffect(() => {
		if (ref.current) {
			width = ref.current.offsetWidth;
			height = ref.current.offsetHeight;
		}
	});
	useLayoutEffect(() => {
		let left = xPos;
		let top = yPos;
		if (xPos + width > window.innerWidth) {
			left = xPos - (xPos + width - window.innerWidth) - 8;
		}
		if (yPos + height > window.innerHeight + window.scrollY) {
			top = yPos - (yPos + height - window.innerHeight) + window.scrollY;
		}
		setStyle({
			top: top,
			left: left,
		});
	}, [xPos, yPos]);
	return showMenu ? (
		<>
			<div className='menu' key={(yPos, xPos)} style={style} ref={ref}>
				<ul>
					{(document.activeElement.className.toString().includes("nav-btn") || document.activeElement.className.toString().includes("card-btn")) && (
						<>
							<li
								onClick={() => {
									window.open(func.link);
								}}>
								<MdTab />
								open link in new tab
							</li>
							<li
								onClick={() => {
									window.open(
										func.link,
										"",
										`width=${window.screen.width}, height=${window.screen.height}`
									);
								}}>
								<RiWindowFill />
								open link in new window
							</li>
						</>
					)}
					{func.create !== null && (
						<>
							<li
								className={"line " + (func.create === null ? "disabled" : "")}
								onClick={() => {
									func.create();
								}}>
								<HiPlus />
								create
							</li>
							<li
								className={func.edit[0] === null ? "disabled" : ""}
								onClick={() => {
									const f = func.edit[0];
									f(func.edit[1]);
								}}>
								<MdEdit />
								edit
							</li>
							<li
								className={func.delete[0] === null ? "disabled" : ""}
								onClick={() => {
									const f = func.delete[0];
									f(func.delete[1]);
								}}>
								<IoClose />
								delete
							</li>
						</>
					)}

					<li onClick={() => navigate(-1)} className='line'>
						<IoMdArrowBack />
						backward
					</li>
					<li onClick={() => navigate(1)}>
						<IoMdArrowForward />
						forward
					</li>
					<li
						onClick={() => {
							window.location.reload();
						}}>
						<AiOutlineReload />
						reload
					</li>
					<li
						className={"line "}
						onMouseDown={() => {
							document.execCommand("copy");
						}}>
						<IoCopy />
						copy
					</li>
					{document.activeElement.type === "text" && (
						<li className='disabled'>
							paste <span>(Ctrl + V)</span>
						</li>
					)}
				</ul>
			</div>
		</>
	) : (
		<></>
	);
};

export default ContextMenu;
