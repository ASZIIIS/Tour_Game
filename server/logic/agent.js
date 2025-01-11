class Agent{
    constructor(name){
        this.name=name;
        this.skillList=Map();
    }
    static addSkill(agent, skillName, skillFunction){
        agent.skillList.set(skillName, skillFunction);
    }
}