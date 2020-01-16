import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Build } from '../Model/Build';
import { BehaviorSubject, Observable, bindCallback } from 'rxjs';
import { Logs } from '../Model/Logs';
import { BUILDS } from '../mocks/mock-build';
import { LOGS } from '../mocks/mock-logs';

@Injectable({
	providedIn: 'root'
})
export class BuildsService {

	STORAGE_BUILDS: string = "builds";
	STORAGE_LOGS: string = "logs";
	builds: Build[] = new Array<Build>();
	logs: Logs[] = new Array<Logs>();

	private buildsSource = new BehaviorSubject<Build[]>(null);
	buildsN = this.buildsSource.asObservable();

	private currentBuildSource = new BehaviorSubject<Build>(null);
	currentBuild = this.currentBuildSource.asObservable();

	getBuildStatus(id: string): string {
		return this.getBuild(id).status;
	}
	//GET builds
	getBuilds(): Build[] {
		return this.storage.get(this.STORAGE_BUILDS);
	}

	//GET individual Build
	getBuild(id: string): Build {
		const obj = this.getBuilds().find(build => build.id === id);
		const build = new Build(obj);
		return build;
	}

	getID(size: number): string {
		let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
		var _id: string = "";
		for (let i = 0; i < 8; i++) {
			_id += possible.charAt(Math.floor(Math.random() * possible.length));
		}
		_id += "-";
		for (let i = 0; i < 4; i++) {
			_id += possible.charAt(Math.floor(Math.random() * possible.length));
		}
		_id += "-";
		for (let i = 0; i < 4; i++) {
			_id += possible.charAt(Math.floor(Math.random() * possible.length));
		}
		_id += "-";
		for (let i = 0; i < 4; i++) {
			_id += possible.charAt(Math.floor(Math.random() * possible.length));
		}
		_id += "-";
		for (let i = 0; i < 12; i++) {
			_id += possible.charAt(Math.floor(Math.random() * possible.length));
		}
		return _id;
	}


	createEmptyBuild(): Build {
		var emptyBuild = new Build();

		emptyBuild.setInitialData(BUILDS.emptyBuild);

		return emptyBuild;
	}

	createEmptyLog(build_id: string): Logs {

		var emptyLog: Logs = {
			"build_id": build_id,
			"validationLogs": [],
			"executionLogs": []
		}

		return emptyLog;
	}

	getAllLogs(): Logs[] {
		return this.storage.get(this.STORAGE_LOGS);
	}
	//POST Build
	addBuild(build: Build): Build {

		var _id: string = this.getID(64);
		build.id = _id;

		//Agregar build
		this.builds = this.getBuilds().concat(build);

		//Almacenar en localstorage
		this.storage.set(this.STORAGE_BUILDS, this.builds);
		//Actualizar el observable
		this.buildsSource.next(this.builds);

		//Create logs for the build created
		this.logs = this.getAllLogs().concat(this.createEmptyLog(build.id));
		this.storage.set(this.STORAGE_LOGS, this.logs);

		//Just for checking that was added
		return this.getBuild(build.id);
	}

	//PUT Build
	updateBuild(id: string, build: Build): Build {

		if (id == "0") {
			return this.addBuild(build);
		}
		else {

			for (var i = 0; i < this.builds.length; i++) {
				if (this.builds[i].id == id) {
					this.builds[i] = build;
				}
			}

			this.storage.set(this.STORAGE_BUILDS, this.builds);
			//Actualizar el observable
			this.buildsSource.next(this.builds);

			return this.getBuild(id);
		}

	}

	//DELETE Build
	deleteBuild(id: string) {
		this.builds = this.getBuilds();

		for (var i = 0; i < this.builds.length; i++) {
			if (this.builds[i].id == id) {
				this.builds.splice(i, 1);
			}
		}

		this.storage.set(this.STORAGE_BUILDS, this.builds);
		this.buildsSource.next(this.builds);
	}

	runBuild(id: string) {
		console.log("Runnning build: " + id);
	}

	getLogs(build_id: string): Logs {
		return this.storage.get(this.STORAGE_LOGS).find(logs => logs.build_id === build_id);
	}

	constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) {

		//Incomplete Builds
		var b1 = new Build();
		b1.setInitialData(BUILDS.b1);

		var b2 = new Build();
		b2.setInitialData(BUILDS.b2);

		var b3 = new Build();
		b3.setInitialData(BUILDS.b3);

		var b4 = new Build();
		b4.setInitialData(BUILDS.b4);

		var b5 = new Build();
		b5.setInitialData(BUILDS.b5);

		var b6 = new Build();
		b6.setInitialData(BUILDS.b6);

		var b7 = new Build();
		b7.setInitialData(BUILDS.b7);

		this.builds.push(b1);
		this.builds.push(b2);
		this.builds.push(b3);
		this.builds.push(b4);
		this.builds.push(b5);
		this.builds.push(b6);
		this.builds.push(b7);

		this.storage.set(this.STORAGE_BUILDS, this.builds);
		this.buildsSource.next(this.builds);

		var logs1: Logs = LOGS.log1;
		var logs2: Logs = LOGS.log2;
		var logs3: Logs = LOGS.log3;
		var logs4: Logs = LOGS.log4;
		var logs5: Logs = LOGS.log5;
		var logs6: Logs = LOGS.log6;
		var logs7: Logs = LOGS.log7;

		this.logs.push(logs1);
		this.logs.push(logs2);
		this.logs.push(logs3);
		this.logs.push(logs4);
		this.logs.push(logs5);
		this.logs.push(logs6);
		this.logs.push(logs7);

		this.storage.set(this.STORAGE_LOGS, this.logs);
	}
}

