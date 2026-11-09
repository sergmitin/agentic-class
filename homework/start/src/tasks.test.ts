import { describe, expect, it } from "vitest"
import { createTask, visibleTasks, seedTasks } from "./tasks"

// Два теста, с которыми поставляется стартер. Они проходят и не покрывают
// поведение, описанное в ISSUE-7.md.
describe("базовая доска", () => {
    it("создаёт задачу и обрезает название", () => {
        const task = createTask(9, "  Купить хлеб  ")
        expect(task?.title).toBe("Купить хлеб")
    })

    it("фильтрует готовые задачи", () => {
        expect(visibleTasks(seedTasks, "done").map((task) => task.id)).toEqual([2])
    })
})

import { renameTask, openCount, isBlankTitle, Task } from "./tasks"

describe("proverka zadach r1 r2 r3", () => {
    it("proverka r1 rename", () => {
        let massiv: Task[] = []
        let t1: Task = { id: 1, title: "delo", done: false }
        massiv.push(t1)

        let res1 = renameTask(massiv, 1, "   delo s probelami   ")
        expect(res1[0].title).toBe("delo s probelami")

        let plohoi_vvod = [
            "",
            " ",
            "   ",
            "\t",
            "\t\t",
            "\u00A0",
            "\u00A0\u00A0",
            "\u200B",
            " \u200B ",
        ]

        for (let i = 0; i < plohoi_vvod.length; i++) {
            let musor = plohoi_vvod[i]
            let popytka = renameTask(massiv, 1, musor)
            expect(popytka[0].title).toBe("delo")
        }
    })

    it("proverka r2 unasledovannaya stroka", () => {
        let vivod = visibleTasks(seedTasks, "all")

        let naidena_pustaya = false
        for (let i = 0; i < vivod.length; i++) {
            let nazvanie = vivod[i].title
            if (isBlankTitle(nazvanie) == true) {
                naidena_pustaya = true
            }
        }

        expect(naidena_pustaya).toBe(false)
        expect(vivod.length).toBe(2)
    })

    it("proverka r3 schetchik", () => {
        let schet = openCount(seedTasks)
        expect(schet).toBe(1)
    })
})