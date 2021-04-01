interface Comment {
    username: string;
    uid: number;
    content: string;
    parentid: number | null;
    cid: number;
    children: Comment[] | undefined;
}

export function formatComments(orphans: Comment[]): Comment[] {
    let parentList = orphans.filter(({ parentid }) => !parentid);
    parentList.forEach((parent) => {
        setChildren(parent, orphans);
    });
    return parentList;
}

function setChildren(parent: Comment, orphans: Comment[]) {
    let children: Comment[] = [];
    orphans.forEach((orphan, index, array) => {
        if (orphan.parentid === parent.cid) {
            children.push(array.splice(index, 1)[0]);
        }
    });
    parent.children = children;
    parent.children.forEach((child) => {
        setChildren(child, orphans);
    });
}
