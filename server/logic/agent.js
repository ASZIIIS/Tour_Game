class Agent{
    constructor(name){
        this.name=name;
        this.skillList=Map();
    }
    static addSkill(agent, skillName, skill){
        agent.skillList.set(skillName, skill);
    }
    useSkill(name, data){
        this.skillList.get(name)(data);
    }
}