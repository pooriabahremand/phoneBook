import BuilderCtor from "../ctorBuilder";
import ImporterCtor from "../ctorImporter";
export default class Run {
    private ctorConfig;
    constructor(argCtorConfig: BuilderCtor | ImporterCtor);
    run(): Promise<void>;
    private getInput;
}
