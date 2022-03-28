import React, { useState, useCallback, useEffect } from "react";

const useContextMenu = (contextFunctions, setContextFunction) => {
	const [xPos, setXPos] = useState("0px");
	const [yPos, setYPos] = useState("0px");
	const [showMenu, setShowMenu] = useState(false);
	const [func, setFunc] = useState({ create: null, edit: [null, null], delete: [null, null], link: null });

	const handleContextMenu = useCallback(
		(e) => {
			if (
				e.path
					.map((html, index) => html.toString())
					.indexOf("[object HTMLTableCellElement]") === -1
			) {
				{
					const copy = {...func};
					copy.edit =  [null, null]
					copy.create = null;
					copy.delete = [null, null]
					copy.link = contextFunctions.current.link
					setFunc(copy)

				}
			} else {
				const copy = {...func};
				copy.edit =  contextFunctions.current.edit
				copy.create = contextFunctions.current.create;
				copy.delete = contextFunctions.current.delete;
				setFunc(copy)

			}
			e.preventDefault();

			setXPos(e.pageX);
			setYPos(e.pageY);
			setShowMenu(true);
		},
		[setXPos, setYPos]
	);

	const handleClick = useCallback(() => {
		showMenu && setShowMenu(false);
	}, [showMenu]);

	useEffect(() => {
		document.addEventListener("click", handleClick);
		document.addEventListener("contextmenu", handleContextMenu);
		return () => {
			document.addEventListener("click", handleClick);
			document.removeEventListener("contextmenu", handleContextMenu);
		};
	});

	return { xPos, yPos, showMenu, func };
};

export default useContextMenu;
