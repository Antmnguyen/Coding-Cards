/**
 * Python side of run-checking, shared by the worker and the card tests.
 * Runs setup, then the answer, then evaluates check with `_` bound to the
 * value of the answer's last expression (None if it ends in a statement).
 */
export const HARNESS = `
import ast

def __cc_run(setup, answer, check):
    try:
        ns = {}
        exec(setup, ns)
        tree = ast.parse(answer)
        value = None
        if tree.body and isinstance(tree.body[-1], ast.Expr):
            last = ast.Expression(tree.body.pop().value)
            exec(compile(tree, "<answer>", "exec"), ns)
            value = eval(compile(last, "<answer>", "eval"), ns)
        else:
            exec(compile(tree, "<answer>", "exec"), ns)
        ns["_"] = value
        return bool(eval(check, ns))
    except BaseException:
        return False
`;

export const RUN_FN = "__cc_run";
