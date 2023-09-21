import BuilderCtor from "../builderCtor";
import ImporterCtor from "../importerCtor";
export default class Run {
    private ctorConfig;
    constructor(argCtorConfig: BuilderCtor | ImporterCtor);
    run(): Promise<void>;
    private getInput;
}
