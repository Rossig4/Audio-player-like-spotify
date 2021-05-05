import React, { useRef, useEffect, useState } from "react";

export function Reproductor() {
	const [songList, setSongList] = useState([]);

	useEffect(() => {
		obtenersonglist();
	}, []);

	const obtenersonglist = async () => {
		try {
			const res = await fetch(
				"https://assets.breatheco.de/apis/sound/songs"
			);
			const data = await res.json();
			setSongList(data);
		} catch (error) {
			console.log(error);
		}
	};

	const controlPlayPause = () => {
		if (reproductor.current.paused) {
			reproductor.current.play();
		} else if (!reproductor.current.paused) {
			reproductor.current.pause();
		}
	};

	let reproductor = useRef();

	const AudioChange = url => {
		let stringfijo = "https://assets.breatheco.de/apis/sound/";
		reproductor.current.src = stringfijo + url;
	};

	return (
		<div>
			<table className="table table-hover table-dark oscuro">
				<thead>
					<tr>
						<th scope="col">#</th>
						<th scope="col">Nombre</th>
					</tr>
				</thead>
				<tbody>
					{songList.map((canciones, index) => {
						return (
							<tr
								key={index}
								onClick={() => {
									AudioChange(canciones.url);
								}}>
								<th scope="row">{canciones.id}</th>
								<td>{canciones.name}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
			<div className="oscuro d-flex justify-content-center border-top p-1 text-white botones">
				<div>
					<i className="fas fa-backward"></i>
				</div>
				<div className="mx-4" onClick={controlPlayPause}>
					<i className="fas fa-play"></i>
				</div>
				<div>
					<i className="fas fa-forward"></i>
				</div>
			</div>
			<audio
				ref={reproductor}
				src="https://assets.breatheco.de/apis/sound/files/mario/songs/castle.mp3"
			/>
		</div>
	);
}
